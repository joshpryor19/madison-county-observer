(function () {
  function log(key) {
    if (window.mcoCaseFile) window.mcoCaseFile.log(key);
  }

  function showMiniToast(text, position) {
    // Replace, don't stack — two corner toasts firing close together
    // (e.g. clicking Otis right before hitting the bottom of the page)
    // would otherwise sit on top of each other.
    document.querySelectorAll('.mco-mini-toast').forEach(function (el) { el.remove(); });

    var toast = document.createElement('div');
    toast.className = 'mco-mini-toast mco-mini-toast--' + (position || 'corner');
    toast.setAttribute('role', 'status');
    toast.textContent = text;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('active'); });
    setTimeout(function () {
      toast.classList.remove('active');
      setTimeout(function () { toast.remove(); }, 400);
    }, 3200);
  }

  // ---- Print watermark ----
  document.body.setAttribute(
    'data-mco-print-date',
    new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
  );
  window.addEventListener('beforeprint', function () { log('print'); });

  // ---- Return-visit nod ----
  // "Returning" means a new browser session after a previous one, not just
  // clicking to a second page during the current visit. localStorage marks
  // "have I ever been here" (persists forever); sessionStorage marks "has
  // this tab/session already been checked" (cleared when the tab closes).
  (function () {
    var EVER_KEY = 'mco_visited_before';
    var SESSION_KEY = 'mco_session_started';
    var RETURNING_KEY = 'mco_returning_session';
    var tagline = document.querySelector('.mco-tagline');

    var sessionStarted = false;
    try { sessionStarted = sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) {}

    if (!sessionStarted) {
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
      var everVisited = false;
      try { everVisited = localStorage.getItem(EVER_KEY) === '1'; } catch (e) {}
      if (everVisited) {
        try { sessionStorage.setItem(RETURNING_KEY, '1'); } catch (e) {}
        log('return-visit');
      } else {
        try { localStorage.setItem(EVER_KEY, '1'); } catch (e) {}
      }
    }

    var isReturningSession = false;
    try { isReturningSession = sessionStorage.getItem(RETURNING_KEY) === '1'; } catch (e) {}
    if (isReturningSession && tagline) {
      tagline.textContent = 'Back again, I see.';
    }
  })();

  // ---- Scroll-to-the-end stamp, About page only ----
  if (document.querySelector('.mco-staff-grid')) {
    var scrollFired = false;
    window.addEventListener('scroll', function () {
      if (scrollFired) return;
      var atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
      if (!atBottom) return;
      scrollFired = true;
      showMiniToast('END OF FILE', 'corner');
      log('scroll-end');
    }, { passive: true });
  }

  // ---- Right-click denial, Crime Blotter only ----
  if (document.querySelector('a[href="crime.html"][aria-current="page"]')) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      showMiniToast('ACCESS DENIED — Don’t be a snitch...', 'center');
      log('right-click');
    });
  }

  // ---- Otis, Classifieds page: click the Lost & Found header ----
  var otisTrigger = document.querySelector('[data-mco-otis-trigger]');
  if (otisTrigger) {
    otisTrigger.addEventListener('click', function () {
      var existing = document.querySelector('.mco-otis-popup');
      if (existing) existing.remove();

      var popup = document.createElement('div');
      popup.className = 'mco-otis-popup';
      popup.innerHTML =
        '<img src="assets/staff/otis.jpg" alt="">' +
        '<span>Looking for something?</span>';

      var header = otisTrigger.closest('.mco-department__header') || otisTrigger.parentElement;
      header.insertAdjacentElement('afterend', popup);
      requestAnimationFrame(function () { popup.classList.add('active'); });
      setTimeout(function () {
        popup.classList.remove('active');
        setTimeout(function () { popup.remove(); }, 400);
      }, 3200);

      log('otis');
    });
  }
})();
