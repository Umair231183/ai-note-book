import React, { useState, useEffect } from 'react';
import styles from './UrduToggle.module.css';
import clsx from 'clsx';

const UrduToggle = ({ chapterId, initialContent }) => {
  const [isUrdu, setIsUrdu] = useState(false);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Optionally fetch initial language preference for the user from backend
    // For now, assume English is default and user toggles to Urdu
  }, []);

  const handleToggle = async () => {
    if (!chapterId || !initialContent) {
      setError("Chapter ID and initial content are required for translation.");
      return;
    }

    setIsLoading(true);
    setError(null);

    if (!isUrdu && !translatedContent) { // Only translate if not already Urdu and not already translated
      try {
        const response = await fetch('/translate/chapter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chapter_id: chapterId,
            content_markdown: initialContent,
          }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setTranslatedContent(data.translated_content);
        setIsUrdu(true);
      } catch (err) {
        console.error("Translation error:", err);
        setError(err.message);
        setIsUrdu(false); // Revert toggle if translation fails
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsUrdu(!isUrdu); // Just toggle display if content is already translated or reverting to English
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switch}>
        <input type="checkbox" checked={isUrdu} onChange={handleToggle} disabled={isLoading} />
        <span className={clsx(styles.slider, styles.round)}></span>
      </label>
      <span className={styles.labelText}>View in Urdu</span>
      {isLoading && <span className={styles.statusText}> (Translating...)</span>}
      {error && <span className={clsx(styles.statusText, styles.errorText)}> (Error: {error})</span>}
      {/* Render translated content somewhere or pass it up */}
      {translatedContent && isUrdu && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h4>Urdu Content Preview:</h4>
          <div dangerouslySetInnerHTML={{ __html: translatedContent }} />
        </div>
      )}
    </div>
  );
};

export default UrduToggle;