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

  function renderTally(container, n) {
    container.innerHTML = '';
    tallyGroups(n).forEach(function (g) {
      var group = document.createElement('span');
      group.className = 'mco-case-file__group';
      for (var i = 0; i < g; i++) {
        var mark = document.createElement('span');
        mark.className = 'mco-case-file__mark';
        group.appendChild(mark);
      }
      if (g === 5) {
        var strike = document.createElement('span');
        strike.className = 'mco-case-file__strike';
        group.appendChild(strike);
      }
      container.appendChild(group);
    });
  }

  function ensurePanel() {
    if (document.getElementById('mco-case-file')) return document.getElementById('mco-case-file');
    var el = document.createElement('div');
    el.id = 'mco-case-file';
    el.innerHTML =
      '<p class="mco-case-file__kicker">Confidential &middot; Reader&rsquo;s File</p>' +
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
      '<div class="mco-case-file-toast__sub">Every exhibit recovered. We&rsquo;re impressed. Slightly concerned. Impressed.</div>';
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
        '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">' +
        '<circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2"/>' +
        '<line x1="15.2" y1="15.2" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
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
