console.log(
  '%cTHE MADISON COUNTY OBSERVER',
  'font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #294c3d;'
);
console.log(
  '%cYou opened the console. We opened a file.',
  'font-family: Menlo, Consolas, monospace; font-size: 12px; color: #69675f;'
);
console.log(
  '%cSTATUS: NOTED. The good stuff still runs on newsprint, not JavaScript.',
  'font-family: Menlo, Consolas, monospace; font-size: 11px; color: #a94834;'
);

(function () {
  var TARGET = 'watching';
  var buffer = '';
  var active = false;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var overlay = document.getElementById('mco-egg-overlay');
  var flash = document.getElementById('mco-egg-flash');
  var toast = document.getElementById('mco-egg-toast');
  var timerEl = document.getElementById('mco-egg-timer');
  if (!overlay || !flash || !toast || !timerEl) return;

  var interference = overlay.querySelector('.mco-egg-interference');
  if (!reduceMotion && interference) {
    interference.classList.add('mco-egg-jitter');
  }

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }

  function fire() {
    if (active) return;
    active = true;

    if (!reduceMotion) {
      flash.classList.add('mco-egg-fire');
      setTimeout(function () { flash.classList.remove('mco-egg-fire'); }, 400);
    }

    overlay.classList.add('active');
    toast.classList.add('active');

    var seconds = 0;
    timerEl.textContent = '00:00';
    var tick = reduceMotion ? null : setInterval(function () {
      seconds++;
      var m = String(Math.floor(seconds / 60)).padStart(2, '0');
      var s = String(seconds % 60).padStart(2, '0');
      timerEl.textContent = m + ':' + s;
    }, 1000);

    setTimeout(function () {
      overlay.classList.remove('active');
      toast.classList.remove('active');
      if (tick) clearInterval(tick);
      active = false;
    }, 4200);
  }

  window.addEventListener('keydown', function (e) {
    if (isTypingTarget(document.activeElement)) return;
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-TARGET.length);
    if (buffer === TARGET) {
      buffer = '';
      fire();
    }
  });
})();
