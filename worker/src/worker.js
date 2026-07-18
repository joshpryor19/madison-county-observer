const ALLOWED_ORIGINS = new Set([
  'https://themadisoncountyobserver.com',
  'https://www.themadisoncountyobserver.com',
  'https://joshpryor19.github.io',
]);

const MAX_NAME_LEN = 80;
const MAX_TEXT_LEN = 2000;
const MAX_COMMENTS_PER_ARTICLE = 500;

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/comments\/([a-z0-9-]+)$/);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (!match) {
      return jsonResponse({ error: 'not found' }, 404, origin);
    }
    const slug = match[1];
    const key = 'comments:' + slug;

    if (request.method === 'GET') {
      const raw = await env.COMMENTS.get(key);
      const comments = raw ? JSON.parse(raw) : [];
      return jsonResponse(comments, 200, origin);
    }

    if (request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (e) {
        return jsonResponse({ error: 'invalid json' }, 400, origin);
      }
      const text = typeof body.text === 'string' ? body.text.trim() : '';
      if (!text) return jsonResponse({ error: 'text required' }, 400, origin);
      const name = (typeof body.name === 'string' && body.name.trim()) || 'A Concerned Citizen';

      const raw = await env.COMMENTS.get(key);
      const comments = raw ? JSON.parse(raw) : [];
      const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      comments.push({
        name: name.slice(0, MAX_NAME_LEN),
        text: text.slice(0, MAX_TEXT_LEN),
        date,
      });
      const trimmed = comments.slice(-MAX_COMMENTS_PER_ARTICLE);
      await env.COMMENTS.put(key, JSON.stringify(trimmed));
      return jsonResponse(trimmed, 201, origin);
    }

    return jsonResponse({ error: 'method not allowed' }, 405, origin);
  },
};
