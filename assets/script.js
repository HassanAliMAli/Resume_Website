(function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // THEME TOGGLE: OS preference by default, override via data-theme + localStorage
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const KEY = 'theme'; // 'light' | 'dark'

  function applyTheme(mode) {
    if (mode === 'dark' || mode === 'light') {
      root.setAttribute('data-theme', mode);
      localStorage.setItem(KEY, mode);
    } else {
      root.removeAttribute('data-theme'); // fallback to OS
      localStorage.removeItem(KEY);
    }
    // Keep browser UI bars in sync
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const bg = getComputedStyle(document.body).backgroundColor;
      meta.setAttribute('content', bg);
    }
  }

  // Load saved theme or use OS preference
  const saved = localStorage.getItem(KEY);
  if (saved === 'dark' || saved === 'light') applyTheme(saved); else applyTheme(null);

  if (btn) {
    btn.addEventListener('click', () => {
      const now = root.getAttribute('data-theme'); // null means OS
      applyTheme(now === 'dark' ? 'light' : 'dark');
    });
  }

  // COPY BUTTONS: Clipboard API (works on HTTPS like GitHub Pages)
  // Falls back to execCommand if needed
  document.querySelectorAll('.copy-btn').forEach((b) => {
    b.addEventListener('click', async () => {
      const text = b.getAttribute('data-copy') || '';
      const old = b.textContent;
      try {
        await navigator.clipboard.writeText(text); // requires secure context
        b.textContent = 'Copied!';
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        b.textContent = 'Copied!';
      }
      setTimeout(() => (b.textContent = old), 1200);
    });
  });
})();
