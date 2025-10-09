import { useEffect, useState } from 'react';
import { DEFAULT_THEME, ALT_THEME } from '@/utils/constants';

export default function ThemeController() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
    }

    return DEFAULT_THEME;
  });

  useEffect(() => {
    const nextTheme = theme || DEFAULT_THEME;

    const applyTheme = (element) => {
      if (!element) return;
      element.setAttribute('data-theme', nextTheme);
      if (nextTheme === 'dark') {
        element.style.colorScheme = 'dark';
      } else {
        element.style.colorScheme = 'light';
      }
    };

    applyTheme(document.documentElement);
    applyTheme(document.body);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', nextTheme);
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((current) => (current === ALT_THEME ? DEFAULT_THEME : ALT_THEME));
  };

  return (
    <label className="flex cursor-pointer gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input
        type="checkbox"
        value={ALT_THEME}
        className="toggle theme-controller"
        checked={theme === ALT_THEME}
        onChange={handleThemeToggle}
        aria-label="Toggle theme"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  );
}
