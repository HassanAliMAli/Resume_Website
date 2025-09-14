(function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle with localStorage
  const key = 'mhali-theme';
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const darkClass = 'dark-mode';

  function applyTheme(mode) {
    if (mode === 'dark') {
      root.classList.add(darkClass);
      document.metaThemeColor = '#0b1220';
    } else {
      root.classList.remove(darkClass);
      document.metaThemeColor = '#ffffff';
    }
  }

  const saved = localStorage.getItem(key);
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const mode = root.classList.contains(darkClass) ? 'light' : 'dark';
      applyTheme(mode);
      localStorage.setItem(key, mode);
    });
  }

  // Copy buttons
  document.querySelectorAll('button[data-copy]').forEach(b => {
    b.addEventListener('click', async () => {
      const text = b.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(text);
        const old = b.textContent;
        b.textContent = 'Copied!';
        setTimeout(() => (b.textContent = old), 1200);
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    });
  });
})();
