import React, { useState, useEffect } from 'react';
import NavbarItem from '@theme/NavbarItem';
import styles from './TranslationToggle.module.css';

const TranslationToggle = () => {
  const [isUrdu, setIsUrdu] = useState(false);

  // In a real implementation, you would use this toggle to affect the entire site's language
  // For now, we'll just keep track of the state

  return (
    <div className={styles.translationToggleContainer}>
      <label className={styles.translationToggleLabel}>
        <input
          type="checkbox"
          checked={isUrdu}
          onChange={(e) => setIsUrdu(e.target.checked)}
          className={styles.translationToggleInput}
        />
        <span className={styles.translationToggleText}> Urdu</span>
      </label>
    </div>
  );
};

// Navbar item that renders the translation toggle
export default function TranslationToggleNavbarItem({
  mobile = false,
  position,
}) {
  if (mobile && position === 'right') {
    return (
      <div className="navbar-sidebar__item menu__list-item">
        <TranslationToggle />
      </div>
    );
  }

  return <TranslationToggle />;
}