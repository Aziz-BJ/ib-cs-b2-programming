// Vercel Edge Function: forwards tutor requests to OpenRouter using the secret
// OPENROUTER_KEY environment variable (set in the Vercel dashboard). The key never
// reaches the browser. The model and reply length are fixed here, not by the client.
export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = [
  'https://aziz-bj.github.io',
  'http://127.0.0.1:8765',
  'http://localhost:8765',
];
const MODEL = 'deepseek/deepseek-v4.1-flash';
const MAX_MESSAGES = 24;
const MAX_CHARS = 24000;
const PER_MINUTE = 15;

// Per-visitor limit, tracked per function instance (best effort).
const hits = new Map();
function overLimit(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 60000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > PER_MINUTE;
}

function allowed(request) {
  const origin = request.headers.get('origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  try {
    // The site itself when served by Vercel (same host as this function).
    if (origin && new URL(origin).host === request.headers.get('host')) return origin;
  } catch {}
  return null;
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function fail(status, message, cors) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

export default async function handler(request) {
  const origin = allowed(request);
  const cors = corsHeaders(origin);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return fail(405, 'Use POST.', cors);
  if (!origin) return fail(403, 'This tutor only works on the study site.', cors);
  const key = process.env.OPENROUTER_KEY;
  if (!key) return fail(500, 'The tutor is not configured yet (missing key).', cors);

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (overLimit(ip)) return fail(429, 'Too many questions in a minute. Wait a moment and try again.', cors);

  let body;
  try { body = await request.json(); } catch { return fail(400, 'Bad request.', cors); }
  const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : null;
  if (!messages || !messages.length) return fail(400, 'No messages.', cors);
  let chars = 0;
  for (const m of messages) {
    if (!m || !['system', 'user', 'assistant'].includes(m.role) || typeof m.content !== 'string') return fail(400, 'Bad message.', cors);
    chars += m.content.length;
  }
  if (chars > MAX_CHARS) return fail(413, 'That question is too long.', cors);

  const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://aziz-bj.github.io/ib-cs-b2-programming/',
      'X-Title': 'B2 Programming study',
    },
    body: JSON.stringify({ model: MODEL, messages, stream: true, max_tokens: 350, temperature: 0.3 }),
  });

  if (!upstream.ok) {
    const s = upstream.status;
    const msg = s === 402 ? 'The tutor has run out of credit for now.'
      : s === 401 ? 'The tutor is unavailable right now (key problem).'
      : s === 429 ? 'The AI is busy. Try again in a few seconds.'
      : `The AI service returned an error (${s}).`;
    return fail(s === 401 ? 503 : s, msg, cors);
  }
  return new Response(upstream.body, {
    status: 200,
    headers: { ...cors, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
  });
}
