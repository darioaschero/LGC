/* ============================================================
   DOCS JS — shared across every documentation page.

   Responsibilities:
   1. Load the sidebar partial into #sidebar-mount.
   2. After injection, mark the current page's link with
      .is-active and expand its parent <details> if needed.
   3. Wire up the global mode (light/dark) toggle.
   4. Wire up the typeset (default/alt) toggle.

   No frameworks. Self-contained.
   ============================================================ */

(() => {
  // ── 1. Sidebar load + active state ───────────────────────
  const mount = document.getElementById('sidebar-mount');
  if (mount) {
    fetch('partials/sidebar.html')
      .then(r => r.text())
      .then(html => {
        mount.innerHTML = html;
        markActiveLink();
      })
      .catch(err => {
        console.error('[docs] sidebar load failed:', err);
      });
  }

  function markActiveLink() {
    // Compare resolved hrefs (via <base>) against current URL.
    const here = location.href.split('#')[0].split('?')[0];
    document.querySelectorAll('.nav-link').forEach(a => {
      if (a.href === here) {
        a.classList.add('is-active');
        // Ensure parent <details> is open.
        const parent = a.closest('details');
        if (parent) parent.open = true;
      }
    });
  }

  // ── 2. Mode toggle (global) ──────────────────────────────
  const modeBtn = document.getElementById('mode-toggle');
  if (modeBtn) {
    const root = document.documentElement;
    const stored = localStorage.getItem('gc-mode');
    if (stored === 'light' || stored === 'dark') {
      root.setAttribute('data-mode', stored);
    }
    const currentMode = () =>
      root.getAttribute('data-mode')
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const refreshMode = () => { modeBtn.textContent = 'Mode: ' + currentMode(); };

    modeBtn.addEventListener('click', () => {
      const next = currentMode() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-mode', next);
      localStorage.setItem('gc-mode', next);
      refreshMode();
    });
    refreshMode();
  }

  // ── 3. Typeset toggle: removed from the global header.
  //    Per-page / per-section typeset switching is wired in
  //    the page's own inline script (e.g. components/rich-text.html
  //    section demos). ──────────────────────────────────────
})();
