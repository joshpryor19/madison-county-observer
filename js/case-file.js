(function () {
  var FOUND_KEY = 'mco_case_file_v1';
  var COMPLETE_KEY = 'mco_case_file_complete_v1';
  var TOTAL = 7;

  function readFound() {
    try {
      var raw = localStorage.getItem(FOUND_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeFound(arr) {
    try { localStorage.setItem(FOUND_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  function isComplete() {
    try { return localStorage.getItem(COMPLETE_KEY) === '1'; } catch (e) { return false; }
  }

  function markComplete() {
    try { localStorage.setItem(COMPLETE_KEY, '1'); } catch (e) {}
  }

  var found = readFound();

  function tallyGroups(n) {
    var groups = [];
    var remaining = n;
    while (remaining > 0) {
      var g = Math.min(5, remaining);
      groups.push(g);
      remaining -= g;
    }
    return groups;
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function renderTally(container, n) {
    container.innerHTML = '';
    tallyGroups(n).forEach(function (g) {
      var width = g * 4 + 2;
      var svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('class', 'mco-case-file__group-svg');
      svg.setAttribute('width', width);
      svg.setAttribute('height', 15);
      svg.setAttribute('viewBox', '0 0 ' + width + ' 15');

      for (var i = 0; i < g; i++) {
        var x = 2 + i * 4;
        var mark = document.createElementNS(SVG_NS, 'line');
        mark.setAttribute('x1', x);
        mark.setAttribute('y1', 1);
        mark.setAttribute('x2', x);
        mark.setAttribute('y2', 14);
        mark.setAttribute('stroke', 'currentColor');
        mark.setAttribute('stroke-width', 1.6);
        svg.appendChild(mark);
      }

      if (g === 5) {
        var strike = document.createElementNS(SVG_NS, 'line');
        strike.setAttribute('class', 'mco-case-file__strike-line');
        strike.setAttribute('x1', 0);
        strike.setAttribute('y1', 13);
        strike.setAttribute('x2', width);
        strike.setAttribute('y2', 2);
        strike.setAttribute('stroke-width', 1.8);
        strike.setAttribute('stroke-linecap', 'round');
        svg.appendChild(strike);
      }

      container.appendChild(svg);
    });
  }

  function ensurePanel() {
    if (document.getElementById('mco-case-file')) return document.getElementById('mco-case-file');
    var el = document.createElement('div');
    el.id = 'mco-case-file';
    el.innerHTML =
      '<p class="mco-case-file__kicker">Observer Log</p>' +
      '<div class="mco-case-file__tally"></div>';
    document.body.appendChild(el);
    return el;
  }

  function updatePanel() {
    if (!found.length) return;
    var el = ensurePanel();
    requestAnimationFrame(function () { el.classList.add('active'); });
    renderTally(el.querySelector('.mco-case-file__tally'), found.length);
  }

  // ---- Authorized Access seal: shared markup for the footer badge and the
  // completion sequence. Each call gets a unique arc id so multiple seals
  // (badge + sequence) can exist in the DOM at once without id collisions. ----

  var sealSeq = 0;

  function sealTicks() {
    var s = '';
    for (var i = 0; i < 32; i++) {
      var angle = (i / 32) * Math.PI * 2;
      var x1 = 60 + Math.cos(angle) * 50;
      var y1 = 60 + Math.sin(angle) * 50;
      var x2 = 60 + Math.cos(angle) * 53;
      var y2 = 60 + Math.sin(angle) * 53;
      s += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"></line>';
    }
    return s;
  }

  function sealMarkup(large) {
    sealSeq += 1;
    var arcId = 'mco-seal-arc-' + sealSeq;
    return (
      '<svg class="mco-seal ' + (large ? 'mco-seal--large' : 'mco-seal--small') + '" viewBox="0 0 120 120" role="img" aria-label="Authorized Access seal">' +
        '<circle cx="60" cy="60" r="56" class="mco-seal__ring-outer"></circle>' +
        '<circle cx="60" cy="60" r="44" class="mco-seal__ring-inner"></circle>' +
        '<g class="mco-seal__ticks">' + sealTicks() + '</g>' +
        '<path id="' + arcId + '" d="M 60,60 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none"></path>' +
        '<text class="mco-seal__text"><textPath href="#' + arcId + '" startOffset="2%">AUTHORIZED ACCESS &#8226; AUTHORIZED ACCESS &#8226;</textPath></text>' +
        '<g class="mco-seal__glyph" transform="translate(60,64)">' +
          '<rect x="-5" y="-2.5" width="10" height="5" rx="1.6"></rect>' +
          '<circle cx="-14" cy="0" r="10.5"></circle>' +
          '<circle cx="14" cy="0" r="10.5"></circle>' +
          '<circle class="mco-seal__pupil" cx="-14" cy="0" r="2.4"></circle>' +
          '<circle class="mco-seal__pupil" cx="14" cy="0" r="2.4"></circle>' +
        '</g>' +
      '</svg>'
    );
  }

  function ensureBadges() {
    document.querySelectorAll('[data-mco-case-badge]').forEach(function (slot) {
      if (slot.querySelector('.mco-case-badge')) return;
      var badge = document.createElement('button');
      badge.type = 'button';
      badge.className = 'mco-case-badge';
      badge.setAttribute('aria-label', 'Authorized Access — open Classified File 001');
      badge.innerHTML = sealMarkup(false) + '<span class="mco-case-badge__label">Authorized<br>Access</span>';
      badge.addEventListener('click', openClassifiedFile);
      slot.appendChild(badge);
    });
  }

  // ---- Completion sequence: plays once, the first time the seventh
  // observation is logged. Dims the page, runs a scanning sweep, then
  // reveals the seal and a way into Classified File 001. ----

  function runCompletionSequence() {
    ensureBadges();

    var overlay = document.createElement('div');
    overlay.id = 'mco-clearance-overlay';
    overlay.className = 'mco-clearance-overlay';
    overlay.innerHTML =
      '<div class="mco-clearance-scan"></div>' +
      '<div class="mco-clearance-content">' +
        '<p class="mco-clearance-headline">Clearance Level Updated</p>' +
        '<div class="mco-clearance-seal">' + sealMarkup(true) + '</div>' +
        '<button type="button" class="mco-clearance-file">' +
          '<span class="mco-clearance-file__tab">Classified File 001</span>' +
          '<span class="mco-clearance-file__cta">Open File &rarr;</span>' +
        '</button>' +
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('active'); });

    var dismissTimer = setTimeout(dismiss, 5200);

    function dismiss() {
      clearTimeout(dismissTimer);
      overlay.classList.remove('active');
      setTimeout(function () { overlay.remove(); }, 500);
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) dismiss();
    });

    overlay.querySelector('.mco-clearance-file').addEventListener('click', function () {
      dismiss();
      openClassifiedFile();
    });
  }

  // ---- Classified File 001 modal ----

  var classifiedReturnFocus = null;

  function openClassifiedFile() {
    if (document.getElementById('mco-classified-overlay')) return;
    classifiedReturnFocus = document.activeElement;

    var overlay = document.createElement('div');
    overlay.id = 'mco-classified-overlay';
    overlay.className = 'mco-classified-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'mco-classified-title');
    overlay.innerHTML =
      '<div class="mco-classified-card">' +
        '<button type="button" class="mco-classified-close" aria-label="Close classified file">&times;</button>' +
        '<p class="mco-classified-stamp">Authorized</p>' +
        '<h2 id="mco-classified-title">Classified File 001</h2>' +
        '<dl class="mco-classified-meta">' +
          '<div><dt>Subject</dt><dd>Reader</dd></div>' +
          '<div><dt>Status</dt><dd>Authorized</dd></div>' +
        '</dl>' +
        '<p class="mco-classified-body">Subject has demonstrated acceptable levels of curiosity. Continued observation is permitted.</p>' +
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('active'); });

    function onKeydown(e) {
      if (e.key === 'Escape') closeClassifiedFile();
    }
    document.addEventListener('keydown', onKeydown);
    overlay._onKeydown = onKeydown;

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeClassifiedFile();
    });
    var closeBtn = overlay.querySelector('.mco-classified-close');
    closeBtn.addEventListener('click', closeClassifiedFile);
    closeBtn.focus();
  }

  function closeClassifiedFile() {
    var overlay = document.getElementById('mco-classified-overlay');
    if (!overlay) return;
    if (overlay._onKeydown) document.removeEventListener('keydown', overlay._onKeydown);
    overlay.classList.remove('active');
    setTimeout(function () { overlay.remove(); }, 300);
    if (classifiedReturnFocus && classifiedReturnFocus.focus) classifiedReturnFocus.focus();
  }

  window.mcoCaseFile = {
    log: function (key) {
      if (found.indexOf(key) !== -1) return;
      found.push(key);
      writeFound(found);
      updatePanel();
      if (found.length >= TOTAL && !isComplete()) {
        markComplete();
        runCompletionSequence();
      }
    }
  };

  updatePanel();
  if (isComplete()) ensureBadges();
})();
