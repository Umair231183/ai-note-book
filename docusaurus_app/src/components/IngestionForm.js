import React, { useState } from 'react';
import styles from './IngestionForm.module.css';
import { useApiService } from './ApiService';

const IngestionForm = () => {
  const { ingestContent } = useApiService();
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState({ title: '', source: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage('Please enter some content to ingest.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await ingestContent(content, metadata);
      setMessage('Content successfully ingested!');
      setContent('');
      setMetadata({ title: '', source: '' });
      console.log('Ingestion response:', response);
    } catch (error) {
      console.error('Ingestion error:', error);
      setMessage('Failed to ingest content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.ingestionContainer}>
      <h2>Content Ingestion</h2>
      <form onSubmit={handleSubmit} className={styles.ingestionForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title (Optional):</label>
          <input
            type="text"
            id="title"
            name="title"
            value={metadata.title}
            onChange={handleInputChange}
            placeholder="Enter title for the content"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="source">Source (Optional):</label>
          <input
            type="text"
            id="source"
            name="source"
            value={metadata.source}
            onChange={handleInputChange}
            placeholder="Enter source of the content"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the content you want to ingest..."
            rows={6}
            className={styles.textareaField}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Ingesting...' : 'Ingest Content'}
        </button>
      </form>

      {message && (
        <div className={`${styles.message} ${message.includes('successfully') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default IngestionForm;