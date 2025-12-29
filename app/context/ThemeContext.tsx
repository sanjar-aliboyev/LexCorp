'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with null to indicate "not yet determined"
  const [theme, setThemeState] = useState<ThemeType>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const initializeTheme = () => {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme') as ThemeType | null;

      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme: ThemeType = systemPrefersDark ? 'dark' : 'light';
        setThemeState(defaultTheme);
        applyTheme(defaultTheme);
      }

      setIsInitialized(true);
    };

    initializeTheme();

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Only apply system preference if no saved preference exists
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const newTheme: ThemeType = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  // Apply theme to DOM
  const applyTheme = (newTheme: ThemeType) => {
    // Apply data-theme attribute (for CSS variables)
    document.body.setAttribute('data-theme', newTheme);

    // Also apply to document element for broader compatibility
    document.documentElement.setAttribute('data-theme', newTheme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0a1017' : '#ffffff');
    }
  };

  // Set theme and persist to localStorage
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme: ThemeType = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for easy usage
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
