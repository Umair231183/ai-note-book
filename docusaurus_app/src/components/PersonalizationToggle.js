import React, { useState, useEffect } from 'react';
import styles from './PersonalizationToggle.module.css';
import clsx from 'clsx';

const PersonalizationToggle = ({ chapterId, userId }) => {
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial preference state for the chapter
    if (userId && chapterId) {
      const fetchPreference = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`/user/preferences?user_id=${userId}`);
          if (!response.ok) throw new Error('Failed to fetch preferences');
          const data = await response.json();
          // Assuming preference type 'chapter_personalization'
          const chapterPref = data.find(p => p.chapter_id === chapterId && p.preference_type === 'chapter_personalization');
          setIsPersonalized(chapterPref && chapterPref.value === 'true');
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPreference();
    }
  }, [chapterId, userId]);

  const handleToggle = async () => {
    if (!userId || !chapterId) {
      setError("User ID and Chapter ID are required for personalization.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const newValue = !isPersonalized;
      const response = await fetch('/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          chapter_id: chapterId,
          preference_type: 'chapter_personalization',
          value: String(newValue),
        }),
      });

      if (!response.ok) throw new Error('Failed to update preference');
      setIsPersonalized(newValue);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switch}>
        <input type="checkbox" checked={isPersonalized} onChange={handleToggle} disabled={isLoading} />
        <span className={clsx(styles.slider, styles.round)}></span>
      </label>
      <span className={styles.labelText}>Personalize this Chapter</span>
      {isLoading && <span className={styles.statusText}> (Updating...)</span>}
      {error && <span className={clsx(styles.statusText, styles.errorText)}> (Error: {error})</span>}
    </div>
  );
};

export default PersonalizationToggle;