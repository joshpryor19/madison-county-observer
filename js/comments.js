// Set this to the deployed Worker's URL (see worker/README.md) once it exists.
// Left as a placeholder until then — the widget shows an honest
// "not yet configured" state rather than failing silently or faking data.
const API_BASE = 'https://mco-comments.YOUR-SUBDOMAIN.workers.dev';

function isConfigured() {
  return !API_BASE.includes('YOUR-SUBDOMAIN');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderList(listEl, comments) {
  if (!comments.length) {
    listEl.innerHTML = '<p class="mco-comments__empty">No letters on file yet. Be the first to go on record.</p>';
    return;
  }
  listEl.innerHTML = comments
    .map(
      (c) => `
      <article class="mco-comments__item">
        <p class="mco-comments__meta"><strong>${escapeHtml(c.name)}</strong> &middot; ${escapeHtml(c.date)}</p>
        <p class="mco-comments__body">${escapeHtml(c.text)}</p>
      </article>`
    )
    .join('');
}

async function loadComments(container) {
  const slug = container.dataset.mcoComments;
  const listEl = container.querySelector('.mco-comments__list');

  if (!isConfigured()) {
    listEl.innerHTML = '<p class="mco-comments__empty">Letters are being filed by hand this week. Check back soon.</p>';
    container.querySelector('.mco-comments__form').style.display = 'none';
    return;
  }

  listEl.innerHTML = '<p class="mco-comments__empty">Pulling the file&hellip;</p>';
  try {
    const res = await fetch(`${API_BASE}/comments/${slug}`);
    if (!res.ok) throw new Error('bad response');
    const comments = await res.json();
    renderList(listEl, comments);
  } catch (e) {
    listEl.innerHTML = '<p class="mco-comments__empty">The file is temporarily unavailable. Try again shortly.</p>';
  }
}

function wireForm(container) {
  const slug = container.dataset.mcoComments;
  const form = container.querySelector('.mco-comments__form');
  const listEl = container.querySelector('.mco-comments__list');
  const nameEl = container.querySelector('.mco-comments__name');
  const textEl = container.querySelector('.mco-comments__text');
  const statusEl = container.querySelector('.mco-comments__status');
  const submitBtn = container.querySelector('.mco-comments__submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = textEl.value.trim();
    if (!text) return;

    submitBtn.disabled = true;
    statusEl.textContent = 'Filing your testimony…';

    try {
      const res = await fetch(`${API_BASE}/comments/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameEl.value.trim(), text }),
      });
      if (!res.ok) throw new Error('bad response');
      const comments = await res.json();
      renderList(listEl, comments);
      textEl.value = '';
      statusEl.textContent = 'On the record.';
    } catch (e) {
      statusEl.textContent = 'Could not file your letter. Try again shortly.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

document.querySelectorAll('[data-mco-comments]').forEach((container) => {
  loadComments(container);
  wireForm(container);
});
