/**
 * data-fetcher.js — Analytics Data Fetcher for evisas.in Dashboard
 *
 * Fetches GA4 + GSC (shared service account) + Facebook Ads data.
 * Uses google-auth-library + direct fetch() — lighter than the full googleapis package.
 *
 * Outputs:
 *   analytics.json         — latest snapshot (always overwritten)
 *   analytics-history.json — rolling array of key-metric snapshots (max 52 entries)
 *
 * Credentials stored in settings.json:
 *   googleServiceAccountKeyPath — absolute path to service-account-key.json
 *   fbAccessToken               — long-lived FB token (60-day)
 *   fbTokenExpiry               — ISO date string of when the FB token expires
 *   fbAdAccountId               — e.g. "act_123456789"
 */

const fs   = require('fs');
const path = require('path');

const ANALYTICS_FILE         = path.join(__dirname, 'analytics.json');
const ANALYTICS_HISTORY_FILE = path.join(__dirname, 'analytics-history.json');
const SETTINGS_FILE          = path.join(__dirname, 'settings.json');
const MAX_HISTORY             = 52;   // ~1 year of weekly snapshots

// GA4 property (p499090813 → strip the "p")
const GA4_PROPERTY_ID = '499090813';
const GSC_SITE_URL    = 'https://evisas.in/';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readJsonSafe(filepath, fallback) {
  try {
    if (fs.existsSync(filepath)) return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (_) {}
  return fallback;
}

function isoDateDaysAgo(n) {
  return new Date(Date.now() - n * 86400000).toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// Google Auth — uses google-auth-library (lightweight vs full googleapis)
// ---------------------------------------------------------------------------

async function getGoogleAccessToken(keyFilePath) {
  const { GoogleAuth } = require('google-auth-library');
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/webmasters.readonly',
    ],
  });
  const client = await auth.getClient();
  const token  = await client.getAccessToken();
  return token.token;
}

// ---------------------------------------------------------------------------
// GA4 — Analytics Data API v1
// ---------------------------------------------------------------------------

async function fetchGA4Data(accessToken) {
  const url     = `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`;
  const headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

  // ── Overview (current 28d vs previous 28d) ──────────────────────────────
  const overviewRes = await fetch(url, {
    method: 'POST', headers,
    body: JSON.stringify({
      dateRanges: [
        { startDate: '28daysAgo', endDate: 'today' },
        { startDate: '56daysAgo', endDate: '29daysAgo' },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'engagedSessions' },
        { name: 'totalUsers' },
        { name: 'bounceRate' },
      ],
    }),
  });
  if (!overviewRes.ok) throw new Error(`GA4 overview ${overviewRes.status}: ${await overviewRes.text()}`);
  const overview = await overviewRes.json();
  const cur  = overview.rows?.[0]?.metricValues || [];
  const prev = overview.rows?.[1]?.metricValues || [];

  // ── WhatsApp clicks ─────────────────────────────────────────────────────
  const waRes = await fetch(url, {
    method: 'POST', headers,
    body: JSON.stringify({
      dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
      metrics: [{ name: 'eventCount' }],
      dimensions: [{ name: 'eventName' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', stringFilter: { value: 'whatsapp_click' } },
      },
    }),
  });
  let waClicks = 0;
  if (waRes.ok) {
    const waData = await waRes.json();
    waClicks = parseInt(waData.rows?.[0]?.metricValues?.[0]?.value || '0');
  }

  // ── Top pages ────────────────────────────────────────────────────────────
  const pagesRes = await fetch(url, {
    method: 'POST', headers,
    body: JSON.stringify({
      dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }],
      dimensions: [{ name: 'pagePath' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    }),
  });
  let topPages = [];
  if (pagesRes.ok) {
    const pd = await pagesRes.json();
    topPages = (pd.rows || []).map(r => ({
      page:     r.dimensionValues?.[0]?.value || '/',
      views:    parseInt(r.metricValues?.[0]?.value || '0'),
      sessions: parseInt(r.metricValues?.[1]?.value || '0'),
    }));
  }

  return {
    sessions:        parseInt(cur[0]?.value || '0'),
    engagedSessions: parseInt(cur[1]?.value || '0'),
    users:           parseInt(cur[2]?.value || '0'),
    bounceRate:      parseFloat((parseFloat(cur[3]?.value || '0') * 100).toFixed(1)),
    whatsappClicks:  waClicks,
    previousPeriod: {
      sessions:        parseInt(prev[0]?.value || '0'),
      engagedSessions: parseInt(prev[1]?.value || '0'),
    },
    topPages,
    period: '28d',
  };
}

// ---------------------------------------------------------------------------
// GSC — Search Console API
// ---------------------------------------------------------------------------

async function fetchGSCData(accessToken) {
  const base    = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`;
  const headers = { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' };
  const dateRange = { startDate: isoDateDaysAgo(28), endDate: isoDateDaysAgo(0) };

  // ── Top pages ────────────────────────────────────────────────────────────
  const pagesRes = await fetch(base, {
    method: 'POST', headers,
    body: JSON.stringify({ ...dateRange, dimensions: ['page'], rowLimit: 20 }),
  });
  if (!pagesRes.ok) throw new Error(`GSC pages ${pagesRes.status}: ${await pagesRes.text()}`);
  const pagesData = await pagesRes.json();
  const topPages = (pagesData.rows || []).map(r => ({
    page:        r.keys?.[0] || '',
    clicks:      r.clicks      || 0,
    impressions: r.impressions || 0,
    ctr:         parseFloat(((r.ctr || 0) * 100).toFixed(1)),
    position:    parseFloat((r.position || 0).toFixed(1)),
  }));

  // ── Top queries ──────────────────────────────────────────────────────────
  const queriesRes = await fetch(base, {
    method: 'POST', headers,
    body: JSON.stringify({ ...dateRange, dimensions: ['query'], rowLimit: 10 }),
  });
  let topQueries = [];
  if (queriesRes.ok) {
    const qd = await queriesRes.json();
    topQueries = (qd.rows || []).map(r => ({
      query:       r.keys?.[0] || '',
      clicks:      r.clicks      || 0,
      impressions: r.impressions || 0,
      position:    parseFloat((r.position || 0).toFixed(1)),
    }));
  }

  // Aggregate totals
  const totals = topPages.reduce((a, r) => ({
    clicks:      a.clicks      + r.clicks,
    impressions: a.impressions + r.impressions,
  }), { clicks: 0, impressions: 0 });

  return {
    totalClicks:      totals.clicks,
    totalImpressions: totals.impressions,
    avgCtr:           totals.impressions > 0
                        ? parseFloat(((totals.clicks / totals.impressions) * 100).toFixed(1))
                        : 0,
    topPages,
    topQueries,
    period: '28d',
  };
}

// ---------------------------------------------------------------------------
// Facebook — Marketing API
// ---------------------------------------------------------------------------

async function fetchFacebookData(accessToken, adAccountId) {
  const since = Math.floor((Date.now() - 28 * 86400000) / 1000);
  const until = Math.floor(Date.now() / 1000);

  const params = new URLSearchParams({
    fields:      'spend,impressions,clicks,cpm,cpc,ctr,reach,actions',
    time_range:  JSON.stringify({ since, until }),
    access_token: accessToken,
    level:        'account',
  });

  const res = await fetch(`https://graph.facebook.com/v19.0/${adAccountId}/insights?${params}`);
  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error?.message || `Facebook API ${res.status}`);
  }

  const insight   = data.data?.[0] || {};
  const actions   = insight.actions || [];
  const linkClicks = parseInt(actions.find(a => a.action_type === 'link_click')?.value || '0');

  return {
    spend:       parseFloat(insight.spend       || '0').toFixed(2),
    impressions: parseInt(insight.impressions   || '0'),
    clicks:      parseInt(insight.clicks        || '0'),
    linkClicks,
    cpm:         parseFloat(insight.cpm         || '0').toFixed(2),
    cpc:         parseFloat(insight.cpc         || '0').toFixed(2),
    ctr:         parseFloat(insight.ctr         || '0').toFixed(2),
    reach:       parseInt(insight.reach         || '0'),
    period: '28d',
  };
}

// ---------------------------------------------------------------------------
// FB token status helper
// ---------------------------------------------------------------------------

function getFbTokenStatus(settings) {
  if (!settings.fbTokenExpiry) return null;
  const daysLeft = Math.floor((new Date(settings.fbTokenExpiry) - Date.now()) / 86400000);
  return {
    expiryDate: settings.fbTokenExpiry,
    daysLeft,
    expired: daysLeft < 0,
    warning: daysLeft < 14,
  };
}

// ---------------------------------------------------------------------------
// Main fetch runner
// ---------------------------------------------------------------------------

async function runAnalyticsFetch() {
  console.log(`  [Analytics] Starting fetch at ${new Date().toISOString()}...`);

  const settings = readJsonSafe(SETTINGS_FILE, {});
  const result = {
    timestamp:      new Date().toISOString(),
    ga4:            null,
    gsc:            null,
    facebook:       null,
    fbTokenStatus:  getFbTokenStatus(settings),
    errors:         {},
  };

  // ── Google (GA4 + GSC) ───────────────────────────────────────────────────
  if (settings.googleServiceAccountKeyPath) {
    let accessToken;
    try {
      accessToken = await getGoogleAccessToken(settings.googleServiceAccountKeyPath);
    } catch (e) {
      result.errors.google = `Auth failed: ${e.message}`;
      console.error('  [Analytics] Google auth error:', e.message);
    }

    if (accessToken) {
      // GA4
      try {
        result.ga4 = await fetchGA4Data(accessToken);
        console.log(`  [Analytics] GA4 ✓ — ${result.ga4.sessions} sessions, ${result.ga4.whatsappClicks} WA clicks`);
      } catch (e) {
        result.errors.ga4 = e.message;
        console.error('  [Analytics] GA4 error:', e.message);
      }
      // GSC
      try {
        result.gsc = await fetchGSCData(accessToken);
        console.log(`  [Analytics] GSC ✓ — ${result.gsc.totalClicks} clicks, ${result.gsc.totalImpressions} impressions`);
      } catch (e) {
        result.errors.gsc = e.message;
        console.error('  [Analytics] GSC error:', e.message);
      }
    }
  } else {
    result.errors.google = 'No service account key configured — open Settings → Analytics Credentials to add it.';
    console.log('  [Analytics] Skipping Google APIs — no service account configured');
  }

  // ── Facebook ─────────────────────────────────────────────────────────────
  if (settings.fbAccessToken && settings.fbAdAccountId) {
    try {
      result.facebook = await fetchFacebookData(settings.fbAccessToken, settings.fbAdAccountId);
      console.log(`  [Analytics] FB ✓ — ₹${result.facebook.spend} spend, ${result.facebook.impressions} impressions`);
    } catch (e) {
      result.errors.facebook = e.message;
      console.error('  [Analytics] Facebook error:', e.message);
    }
  } else {
    result.errors.facebook = 'Facebook token or ad account ID not configured — open Settings → Analytics Credentials.';
    console.log('  [Analytics] Skipping Facebook — not configured');
  }

  // ── Save current analytics.json ──────────────────────────────────────────
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(result, null, 2));
    console.log('  [Analytics] Saved analytics.json');
  } catch (e) {
    console.error('  [Analytics] Error saving analytics.json:', e.message);
  }

  // ── Append to analytics-history.json (key metrics only) ──────────────────
  try {
    const history = readJsonSafe(ANALYTICS_HISTORY_FILE, []);
    history.push({
      timestamp:       result.timestamp,
      ga4Summary:      result.ga4 ? {
        sessions:       result.ga4.sessions,
        whatsappClicks: result.ga4.whatsappClicks,
        users:          result.ga4.users,
      } : null,
      gscSummary:      result.gsc ? {
        totalClicks:      result.gsc.totalClicks,
        totalImpressions: result.gsc.totalImpressions,
      } : null,
      facebookSummary: result.facebook ? {
        spend:       result.facebook.spend,
        impressions: result.facebook.impressions,
        clicks:      result.facebook.clicks,
      } : null,
    });
    while (history.length > MAX_HISTORY) history.shift();
    fs.writeFileSync(ANALYTICS_HISTORY_FILE, JSON.stringify(history, null, 2));
    console.log(`  [Analytics] History snapshot saved (${history.length}/${MAX_HISTORY} entries)`);
  } catch (e) {
    console.error('  [Analytics] Error saving analytics-history.json:', e.message);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Start on interval (default: every 6 hours)
// ---------------------------------------------------------------------------

function startAnalyticsFetcher(intervalMs = 6 * 60 * 60 * 1000) {
  console.log(`  [Analytics] Fetcher started. Interval: ${intervalMs / 3600000}h`);

  runAnalyticsFetch().catch(err =>
    console.error('  [Analytics] Initial fetch failed:', err.message)
  );

  if (intervalMs > 0) {
    return setInterval(() => {
      runAnalyticsFetch().catch(err =>
        console.error('  [Analytics] Scheduled fetch failed:', err.message)
      );
    }, intervalMs);
  }
  return null;
}

module.exports = { runAnalyticsFetch, startAnalyticsFetcher };
