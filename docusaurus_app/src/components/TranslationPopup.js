import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import styles from './TranslationPopup.module.css';

const TranslationPopup = () => {
  const { selectedText, translation, isLoading, translateSelectedText, clearTranslation } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

  useEffect(() => {
    if (selectedText) {
      // Get the selection position to place the popup
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setPosition({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY - 40 // Position above the selection
        });
        setShowPopup(true);
      }
    } else {
      setShowPopup(false);
    }
  }, [selectedText]);

  const handleTranslate = () => {
    translateSelectedText();
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        clearTranslation();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clearTranslation]);

  if (!showPopup || !selectedText) return null;

  return (
    <div 
      className={styles.popup}
      style={{ top: position.y, left: position.x }}
      ref={popupRef}
    >
      <div className={styles.popupContent}>
        <div className={styles.selectedTextPreview}>
          "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"
        </div>
        {isLoading ? (
          <div className={styles.loading}>Translating...</div>
        ) : translation ? (
          <div className={styles.translationResult}>
            <div className={styles.translationText}>
              {translation}
            </div>
            <button 
              className={styles.closeButton}
              onClick={clearTranslation}
            >
              Close
            </button>
          </div>
        ) : (
          <button 
            className={styles.translateButton}
            onClick={handleTranslate}
          >
            Translate to Urdu
          </button>
        )}
      </div>
    </div>
  );
};

export default TranslationPopup;