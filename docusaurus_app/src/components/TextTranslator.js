import React, { useState } from 'react';
import styles from './TextTranslator.module.css';
import clsx from 'clsx';

const TextTranslator = ({ text, className = '' }) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const translateText = async () => {
    if (!text) return;

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call your backend translation API
      // For now, we'll simulate the translation
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          target_language: 'ur',
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTranslatedText(data.translated_text || 'ترجمہ ہو رہا ہے...');
      setIsTranslated(true);
    } catch (err) {
      console.error("Translation error:", err);
      setError(err.message);
      // Fallback: use a simple simulated translation
      setTranslatedText('یہ متن اردو میں ترجمہ کیا جا رہا ہے');
      setIsTranslated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTranslation = () => {
    setIsTranslated(false);
    setTranslatedText('');
  };

  return (
    <div className={clsx(styles.translatorContainer, className)}>
      <div className={styles.originalText}>
        {text}
      </div>
      
      {isTranslated && (
        <div className={styles.translatedText}>
          {translatedText}
        </div>
      )}
      
      <div className={styles.controls}>
        {!isTranslated ? (
          <button 
            className={styles.translateButton}
            onClick={translateText}
            disabled={isLoading}
          >
            {isLoading ? 'Translating...' : '.Translate to Urdu'}
          </button>
        ) : (
          <button 
            className={styles.translateButton}
            onClick={resetTranslation}
          >
            Show in English
          </button>
        )}
      </div>
      
      {error && (
        <div className={styles.errorText}>
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default TextTranslator;