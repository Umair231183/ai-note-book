import React, { useState, useEffect } from 'react';
import styles from './HealthStatus.module.css';
import { useApiService } from './ApiService';

const HealthStatus = () => {
  const { healthCheck } = useApiService();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await healthCheck();
      setStatus(response);
    } catch (err) {
      setError(err.message);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  // Check health on component mount
  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className={styles.healthContainer}>
      <h3>API Health Status</h3>
      
      {loading && (
        <div className={styles.loading}>Checking health...</div>
      )}
      
      {error && (
        <div className={styles.error}>
          <p>❌ API is not accessible: {error}</p>
          <button onClick={checkHealth} className={styles.retryButton}>
            Retry
          </button>
        </div>
      )}
      
      {status && !error && !loading && (
        <div className={styles.status}>
          <p>✅ API is healthy</p>
          <p><strong>Status:</strong> {status.status || 'Unknown'}</p>
          {status.details && (
            <p><strong>Details:</strong> {JSON.stringify(status.details)}</p>
          )}
          <button onClick={checkHealth} className={styles.refreshButton}>
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthStatus;