const dateEl = document.querySelector('[data-mco-date]');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
}

const tickerEls = document.querySelectorAll('[data-mco-ticker]');
if (tickerEls.length) {
  import('./weather.js')
    .then((mod) => mod.getWeatherTicker())
    .then((text) => {
      tickerEls.forEach((el) => { el.textContent = text; });
    })
    .catch(() => {});
}

document.querySelectorAll('.mco-nav-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const nav = document.getElementById(btn.getAttribute('aria-controls'));
    if (!nav) return;
    const isOpen = nav.classList.toggle('mco-nav-open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
});
