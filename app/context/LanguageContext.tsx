'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../constants/translations';

// Define the available languages
type LangType = 'UZ' | 'RU' | 'EN';

// Define the Context shape
interface LanguageContextType {
  lang: LangType;
  setLang: (lang: LangType) => void;
  t: typeof translations[keyof typeof translations];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangType>('UZ');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for easy usage
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}