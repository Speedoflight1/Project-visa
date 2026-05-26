/**
 * eVisas.in Operations Dashboard — Express Server
 * Port: 3333
 *
 * Serves the dashboard UI and provides REST endpoints for
 * task management, status tracking, lead scoring, health
 * monitoring, and settings.
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { startHealthMonitor }    = require('./health-monitor');
const { startAnalyticsFetcher, runAnalyticsFetch } = require('./data-fetcher');

const app = express();
const PORT = 3333;

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve dashboard static files

// ---------------------------------------------------------------------------
// Paths to runtime JSON files
// ---------------------------------------------------------------------------
const TASK_FILE    = path.join(__dirname, 'task.json');
const RESULT_FILE  = path.join(__dirname, 'result.json');
const STATUS_FILE  = path.join(__dirname, 'status.json');
const HISTORY_FILE = path.join(__dirname, 'history.json');
const LEADS_FILE   = path.join(__dirname, 'leads.json');
const HEALTH_LOG   = path.join(__dirname, 'health-log.json');
const SETTINGS_FILE = path.join(__dirname, 'settings.json');
const PENDING_DIR       = path.join(__dirname, 'pending');
const ANALYTICS_FILE    = path.join(__dirname, 'analytics.json');
const ANALYTICS_HISTORY = path.join(__dirname, 'analytics-history.json');

// ---------------------------------------------------------------------------
// Helpers — safe read / write
// ---------------------------------------------------------------------------

/**
 * Read a JSON file. Returns `fallback` when the file is missing or corrupt.
 */
function readJSON(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[readJSON] Error reading ${path.basename(filePath)}:`, err.message);
    return fallback;
  }
}

/**
 * Write a value as JSON to disk (pretty-printed).
 */
function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[writeJSON] Error writing ${path.basename(filePath)}:`, err.message);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Initialize runtime JSON files if they don't already exist
// ---------------------------------------------------------------------------
function initFiles() {
  const defaults = [
    [TASK_FILE,    {}],
    [RESULT_FILE,  {}],
    [STATUS_FILE,  { step: 'idle', message: 'Ready' }],
    [HISTORY_FILE, []],
    [LEADS_FILE,        []],
    [HEALTH_LOG,        []],
    [SETTINGS_FILE,     {}],
    [ANALYTICS_FILE,    {}],
    [ANALYTICS_HISTORY, []],
  ];

  defaults.forEach(([filePath, fallback]) => {
    if (!fs.existsSync(filePath)) {
      writeJSON(filePath, fallback);
      console.log(`  ✔ Created ${path.basename(filePath)}`);
    }
  });

  // Ensure the pending/ directory exists
  if (!fs.existsSync(PENDING_DIR)) {
    fs.mkdirSync(PENDING_DIR, { recursive: true });
    console.log('  ✔ Created pending/ directory');
  }
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// GET / — serve index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST /task — queue a new task
app.post('/task', (req, res) => {
  try {
    const { task, model } = req.body;
    const entry = {
      task,
      model: model || 'default',
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    writeJSON(TASK_FILE, entry);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[POST /task]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /status — current pipeline status
app.get('/status', (_req, res) => {
  try {
    const data = readJSON(STATUS_FILE, { step: 'idle', message: 'Ready' });
    return res.json(data);
  } catch (err) {
    console.error('[GET /status]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /result — latest result
app.get('/result', (_req, res) => {
  try {
    const data = readJSON(RESULT_FILE, { content: '', timestamp: null });
    return res.json(data);
  } catch (err) {
    console.error('[GET /result]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /history — task history array
app.get('/history', (_req, res) => {
  try {
    const data = readJSON(HISTORY_FILE, []);
    return res.json(data);
  } catch (err) {
    console.error('[GET /history]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// POST /approve — save approved content to pending/ folder
app.post('/approve', (req, res) => {
  try {
    const { content, task, filename } = req.body;
    const safeName = `${(task || 'approved').replace(/[^a-z0-9_-]/gi, '_')}-${Date.now()}.md`;
    const savePath = path.join(PENDING_DIR, safeName);
    fs.writeFileSync(savePath, content || '', 'utf-8');
    return res.json({ ok: true, path: savePath });
  } catch (err) {
    console.error('[POST /approve]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /health — latest health check entry
app.get('/health', (_req, res) => {
  try {
    const log = readJSON(HEALTH_LOG, []);
    if (log.length === 0) {
      return res.json({ healthy: true, lastCheck: null });
    }
    return res.json(log[log.length - 1]);
  } catch (err) {
    console.error('[GET /health]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// POST /leads — add a new lead
app.post('/leads', (req, res) => {
  try {
    const lead = req.body;
    lead.id = crypto.randomUUID();
    const leads = readJSON(LEADS_FILE, []);
    leads.push(lead);
    writeJSON(LEADS_FILE, leads);
    return res.json(lead);
  } catch (err) {
    console.error('[POST /leads]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /leads — return scored leads with WhatsApp messages
app.get('/leads', (_req, res) => {
  try {
    const { scoreLeads } = require('./leads-scorer');
    const leads = readJSON(LEADS_FILE, []);
    const settings = readJSON(SETTINGS_FILE, {});
    const groqApiKey = settings.groqApiKey || '';
    const scored = scoreLeads(leads, groqApiKey);
    return res.json(scored);
  } catch (err) {
    console.error('[GET /leads]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /leads/:id — remove a lead by ID
app.delete('/leads/:id', (req, res) => {
  try {
    let leads = readJSON(LEADS_FILE, []);
    leads = leads.filter((l) => l.id !== req.params.id);
    writeJSON(LEADS_FILE, leads);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[DELETE /leads/:id]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /settings — read current settings
app.get('/settings', (_req, res) => {
  try {
    const data = readJSON(SETTINGS_FILE, {});
    return res.json(data);
  } catch (err) {
    console.error('[GET /settings]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// POST /settings — merge partial settings
app.post('/settings', (req, res) => {
  try {
    const existing = readJSON(SETTINGS_FILE, {});
    const merged = { ...existing, ...req.body };
    writeJSON(SETTINGS_FILE, merged);
    return res.json(merged);
  } catch (err) {
    console.error('[POST /settings]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /analytics — latest analytics snapshot
app.get('/analytics', (_req, res) => {
  try {
    const data = readJSON(ANALYTICS_FILE, { timestamp: null });
    return res.json(data);
  } catch (err) {
    console.error('[GET /analytics]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /analytics/history — rolling history snapshots
app.get('/analytics/history', (_req, res) => {
  try {
    const data = readJSON(ANALYTICS_HISTORY, []);
    return res.json(data);
  } catch (err) {
    console.error('[GET /analytics/history]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// POST /analytics/refresh — trigger an immediate analytics fetch
app.post('/analytics/refresh', (_req, res) => {
  runAnalyticsFetch()
    .then(data => res.json({ ok: true, timestamp: data.timestamp }))
    .catch(err => {
      console.error('[POST /analytics/refresh]', err.message);
      res.status(500).json({ error: err.message });
    });
});

// POST /update-status — write status (used by watcher)
app.post('/update-status', (req, res) => {
  try {
    const { step, message, progress } = req.body;
    const status = { step, message, progress, timestamp: new Date().toISOString() };
    writeJSON(STATUS_FILE, status);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[POST /update-status]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// Startup
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════╗
  ║                                                  ║
  ║        eVisas.in Operations Dashboard            ║
  ║        ─────────────────────────────              ║
  ║        Server running on port ${PORT}              ║
  ║        http://localhost:${PORT}                     ║
  ║                                                  ║
  ╚══════════════════════════════════════════════════╝
  `);

  // Initialize JSON files
  console.log('[init] Ensuring runtime files exist…');
  initFiles();

  // Start the health monitor (default: every 30 minutes)
  console.log('[init] Starting health monitor (interval: 30 min)…');
  startHealthMonitor();

  // Start the analytics fetcher (default: every 6 hours)
  console.log('[init] Starting analytics fetcher (interval: 6 hr)…');
  startAnalyticsFetcher();

  console.log('[init] Dashboard is ready. 🚀\n');
});

module.exports = app;
