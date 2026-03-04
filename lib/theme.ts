export type Theme = 'light' | 'dark';

const KEY = 'arc-theme';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getActiveTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const s = localStorage.getItem(KEY);
    if (s === 'dark' || s === 'light') return s;
  } catch {}
  return getSystemTheme();
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(KEY, theme); } catch {}
}

export function toggleTheme(): Theme {
  const cur = (document.documentElement.getAttribute('data-theme') as Theme | null) ?? getActiveTheme();
  const next: Theme = cur === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

// Inlined FOUC-prevention script (run before React hydrates)
export const themeScript = `(function(){try{var t=localStorage.getItem('arc-theme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
