/**
 * generate-token.js — One-time OAuth2 refresh token generator
 *
 * Run this ONCE: node generate-token.js
 * It opens your browser → you sign in as officialevisas@gmail.com
 * → saves the refresh token to settings.json automatically.
 *
 * After this you never need to run it again. The refresh token
 * lasts forever (until revoked).
 */

const http    = require('http');
const https   = require('https');
const fs      = require('fs');
const path    = require('path');
const { exec } = require('child_process');

const SETTINGS_FILE = path.join(__dirname, 'settings.json');

// Read settings safely
function readSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
  } catch (_) {}
  return {};
}

// ── Step 1: Get OAuth2 Client ID + Secret from settings ─────────────────────
const settings = readSettings();

if (!settings.googleOAuthClientId || !settings.googleOAuthClientSecret) {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║           generate-token.js — First-time Setup              ║
╚══════════════════════════════════════════════════════════════╝

You need to add your OAuth2 Client ID and Secret to settings.json first.

HOW TO GET THEM (2 minutes):
  1. Go to: console.cloud.google.com
  2. Select project "evisas-analytics"
  3. APIs & Services → Credentials
  4. Click "+ Create Credentials" → "OAuth client ID"
  5. Application type: Desktop app
  6. Name: evisas-dashboard
  7. Click Create → copy Client ID and Client Secret

Then add these to dashboard/settings.json:
  {
    "googleOAuthClientId": "YOUR_CLIENT_ID.apps.googleusercontent.com",
    "googleOAuthClientSecret": "YOUR_CLIENT_SECRET"
  }

Then run: node generate-token.js again.
`);
  process.exit(1);
}

const CLIENT_ID     = settings.googleOAuthClientId;
const CLIENT_SECRET = settings.googleOAuthClientSecret;
const REDIRECT_URI  = 'http://localhost:4242/callback';
const SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/webmasters.readonly',
].join(' ');

// ── Step 2: Build auth URL ───────────────────────────────────────────────────
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&access_type=offline` +
  `&prompt=consent`;

// ── Step 3: Start local server to catch the callback ─────────────────────────
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost:4242');
  if (url.pathname !== '/callback') return;

  const code = url.searchParams.get('code');
  if (!code) {
    res.end('No code received. Please try again.');
    return;
  }

  res.end(`
    <html><body style="font-family:sans-serif;padding:40px;text-align:center">
      <h2>✅ Authorization successful!</h2>
      <p>You can close this tab and return to the terminal.</p>
    </body></html>
  `);

  server.close();

  // ── Step 4: Exchange code for tokens ──────────────────────────────────────
  console.log('\n  Exchanging code for tokens...');
  const body = new URLSearchParams({
    code,
    client_id:     CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri:  REDIRECT_URI,
    grant_type:    'authorization_code',
  }).toString();

  const tokenRes = await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path:     '/token',
      method:   'POST',
      headers:  { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': body.length },
    }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });

  if (tokenRes.error) {
    console.error('\n  ❌ Token error:', tokenRes.error_description);
    process.exit(1);
  }

  // ── Step 5: Save refresh token to settings.json ───────────────────────────
  const updated = { ...readSettings(), googleRefreshToken: tokenRes.refresh_token };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));

  console.log(`
  ✅ Refresh token saved to settings.json!

  Token starts with: ${tokenRes.refresh_token?.substring(0, 20)}...

  You're done. Restart your dashboard server and click
  "Refresh Now" on the Analytics panel — GA4 + GSC data
  will start flowing immediately.
`);
  process.exit(0);
});

server.listen(4242, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║           generate-token.js — Opening browser...            ║
╚══════════════════════════════════════════════════════════════╝

  Sign in as: officialevisas@gmail.com
  (the account that owns GA4 and GSC for evisas.in)

  Opening: ${authUrl.substring(0, 80)}...
`);

  // Open browser automatically
  const open = process.platform === 'win32'
    ? `start "" "${authUrl}"`
    : process.platform === 'darwin'
      ? `open "${authUrl}"`
      : `xdg-open "${authUrl}"`;

  exec(open, (err) => {
    if (err) {
      console.log('\n  Could not open browser automatically. Please open this URL manually:\n');
      console.log('  ' + authUrl + '\n');
    }
  });
});
