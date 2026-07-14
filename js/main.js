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
