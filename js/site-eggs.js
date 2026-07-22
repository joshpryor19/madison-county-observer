(function () {
  function log(key) {
    if (window.mcoCaseFile) window.mcoCaseFile.log(key);
  }

  function isTouchDevice() {
    try {
      return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    } catch (e) {
      return false;
    }
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

  // ---- Print watermark (desktop: real print) ----
  document.body.setAttribute(
    'data-mco-print-date',
    new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
  );
  window.addEventListener('beforeprint', function () { log('print'); });

  // ---- Printable Copy (mobile-reachable equivalent of the print egg) ----
  // window.print()/beforeprint isn't reliably dispatched when printing is
  // triggered from a phone's native share sheet, so this gives touch users
  // a way to land the same egg: a plausible-looking footer utility that
  // shows a fake print preview instead of the real print dialog. Shares the
  // 'print' key with the desktop trigger, so it only ever counts once.
  function showPrintPreview() {
    var existing = document.getElementById('mco-print-preview');
    if (existing) existing.remove();

    var dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
    var overlay = document.createElement('div');
    overlay.id = 'mco-print-preview';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<div class="mco-print-preview__doc">' +
        '<span class="mco-print-preview__stamp">UNAUTHORIZED REPRODUCTION</span>' +
        '<span class="mco-print-preview__date">' + dateStr + '</span>' +
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('active'); });

    setTimeout(function () {
      overlay.classList.remove('active');
      setTimeout(function () {
        overlay.remove();
        showMiniToast('REPRODUCTION ATTEMPT LOGGED', 'center');
        log('print');
      }, 350);
    }, 1400);
  }

  (function () {
    var contactLink = document.querySelector('.mco-footer a[href$="contact.html"]');
    if (!contactLink) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mco-footer-util';
    btn.textContent = 'Printable Copy';
    btn.addEventListener('click', showPrintPreview);
    contactLink.after(document.createTextNode(' · '), btn);
  })();

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

  // ---- Right-click denial (desktop) + press-and-hold (mobile), Crime Blotter only ----
  if (document.querySelector('a[href="crime.html"][aria-current="page"]')) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      showMiniToast('ACCESS DENIED — Don’t be a snitch...', 'center');
      log('right-click');
    });

    document.querySelectorAll('.mco-card-img').forEach(function (img) {
      // Suppress the native iOS/Android long-press callout (save image,
      // open in new tab) so it doesn't fight with the toast below.
      img.style.setProperty('-webkit-touch-callout', 'none');
      img.style.setProperty('-webkit-user-select', 'none');
      img.style.userSelect = 'none';

      var pressTimer = null;
      var longPressFired = false;
      var startX = 0;
      var startY = 0;

      img.addEventListener('touchstart', function (e) {
        longPressFired = false;
        var t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
        pressTimer = setTimeout(function () {
          longPressFired = true;
          showMiniToast('ACCESS DENIED — Don’t be a snitch...', 'center');
          log('right-click');
        }, 800);
      }, { passive: true });

      img.addEventListener('touchmove', function (e) {
        var t = e.touches[0];
        if (Math.abs(t.clientX - startX) > 10 || Math.abs(t.clientY - startY) > 10) {
          clearTimeout(pressTimer);
        }
      }, { passive: true });

      img.addEventListener('touchend', function (e) {
        clearTimeout(pressTimer);
        // A long press shouldn't also follow the card's link.
        if (longPressFired) e.preventDefault();
      });

      img.addEventListener('touchcancel', function () {
        clearTimeout(pressTimer);
      });
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

  // ---- Refresh egg: one reload on desktop, three pull-to-refresh reloads
  // on mobile (native pull-to-refresh is itself a page reload, so it's
  // counted the same way — just with a higher bar). ----
  (function () {
    function isReloadNavigation() {
      try {
        var entries = performance.getEntriesByType('navigation');
        if (entries && entries.length && entries[0].type) return entries[0].type === 'reload';
      } catch (e) {}
      try {
        if (performance.navigation) return performance.navigation.type === 1;
      } catch (e) {}
      return false;
    }

    if (!isReloadNavigation()) return;

    if (isTouchDevice()) {
      var count = 0;
      try { count = parseInt(sessionStorage.getItem('mco_reload_count') || '0', 10) + 1; } catch (e) { count = 1; }
      try { sessionStorage.setItem('mco_reload_count', String(count)); } catch (e) {}
      if (count >= 3) {
        showMiniToast('PERSISTENCE LOGGED', 'corner');
        log('refresh');
      }
    } else {
      showMiniToast('PERSISTENCE LOGGED', 'corner');
      log('refresh');
    }
  })();
})();
