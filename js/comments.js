(function () {
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function render(container, comments) {
    if (!comments.length) {
      container.innerHTML = '<div style="font-family:\'PT Serif\',serif;font-style:italic;font-size:15px;color:#7a776c;margin-bottom:30px">No letters on file yet. Be the first to file a report.</div>';
      return;
    }
    let html = '<div style="display:flex;flex-direction:column;gap:18px;margin-bottom:30px">';
    comments.forEach((c) => {
      html += '<div style="border:1px solid #121210;background:#fff;padding:16px 18px">'
        + '<div style="display:flex;justify-content:space-between;font-family:\'Courier Prime\',monospace;font-size:11px;letter-spacing:0.5px;color:#1e4d3b;margin-bottom:8px">'
        + '<span>' + escapeHtml(c.name) + '</span><span>' + escapeHtml(c.date) + '</span></div>'
        + '<div style="font-family:\'PT Serif\',serif;font-size:15px;line-height:1.55;color:#1c1c18;white-space:pre-wrap">' + escapeHtml(c.text) + '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  window.initMcoComments = function (storageKey, containerId, nameInputId, textInputId, submitBtnId) {
    const container = document.getElementById(containerId);
    const nameInput = document.getElementById(nameInputId);
    const textInput = document.getElementById(textInputId);
    const submitBtn = document.getElementById(submitBtnId);

    let comments = [];
    try {
      const raw = localStorage.getItem(storageKey);
      comments = raw ? JSON.parse(raw) : [];
    } catch (e) {
      comments = [];
    }
    render(container, comments);

    submitBtn.addEventListener('click', () => {
      const text = textInput.value.trim();
      if (!text) return;
      const name = nameInput.value.trim() || 'A Concerned Citizen';
      const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      comments.push({ name, text, date });
      try { localStorage.setItem(storageKey, JSON.stringify(comments)); } catch (e) {}
      nameInput.value = '';
      textInput.value = '';
      render(container, comments);
    });
  };
})();
