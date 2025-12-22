import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import TranslationPopup from '@site/src/components/TranslationPopup';

export default function Layout(props) {
  return (
    <>
      <OriginalLayout {...props} />
      <TranslationPopup />
    </>
  );
}