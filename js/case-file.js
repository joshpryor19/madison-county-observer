(function () {
  var FOUND_KEY = 'mco_case_file_v1';
  var COMPLETE_KEY = 'mco_case_file_complete_v1';
  var TOTAL = 6;

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
      '<p class="mco-case-file__kicker">Confidential</p>' +
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

  function showCompletionToast() {
    var toast = document.createElement('div');
    toast.id = 'mco-case-file-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML =
      '<div class="mco-case-file-toast__headline">File Complete.</div>' +
      '<div class="mco-case-file-toast__sub">Every exhibit recovered. Impressive, and slightly concerning.</div>';
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('active'); });
    setTimeout(function () {
      toast.classList.remove('active');
      setTimeout(function () { toast.remove(); }, 500);
    }, 5200);
  }

  function ensureBadges() {
    document.querySelectorAll('[data-mco-case-badge]').forEach(function (slot) {
      if (slot.querySelector('.mco-case-badge')) return;
      var badge = document.createElement('span');
      badge.className = 'mco-case-badge';
      badge.title = 'Case file: complete';
      badge.innerHTML =
        '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5">' +
        '<rect x="4.5" y="6" width="5" height="8" rx="1.6"/>' +
        '<rect x="14.5" y="6" width="5" height="8" rx="1.6"/>' +
        '<path d="M9.5 8 L14.5 8"/>' +
        '<circle cx="7" cy="16" r="2.3"/>' +
        '<circle cx="17" cy="16" r="2.3"/>' +
        '</svg>';
      slot.appendChild(badge);
    });
  }

  window.mcoCaseFile = {
    log: function (key) {
      if (found.indexOf(key) !== -1) return;
      found.push(key);
      writeFound(found);
      updatePanel();
      if (found.length >= TOTAL && !isComplete()) {
        markComplete();
        showCompletionToast();
        ensureBadges();
      }
    }
  };

  updatePanel();
  if (isComplete()) ensureBadges();
})();
