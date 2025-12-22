import React from 'react';
import { TranslationProvider } from './contexts/TranslationContext';

export default function Root({ children }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}