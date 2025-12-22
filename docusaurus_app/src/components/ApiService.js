import { useCallback } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Custom hook that provides API service functions
export const useApiService = () => {
  const {siteConfig} = useDocusaurusContext();
  const API_BASE_URL = siteConfig.customFields.FASTAPI_BASE_URL || 'http://localhost:8000';

  // Health check endpoint
  const healthCheck = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Health check failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }, [API_BASE_URL]);

  // Query endpoint for general questions - with streaming support
  const query = useCallback(async (question, onStreamUpdate) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Query request failed with status: ${response.status}`);
      }

      // Check if the response is JSON or text stream
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // Handle JSON response
        const data = await response.json();
        let cleanText = data.llm_answer || data.text || data.response || '';

        // Filter out storage compatibility messages
        if (cleanText.includes('storage compatibility issue')) {
          cleanText = cleanText.replace(/Note: Content retrieval not available due to storage compatibility issue/g, '').trim();
          cleanText = cleanText.replace(/\s+/g, ' ').trim(); // Clean up extra spaces
        }

        if (onStreamUpdate) {
          onStreamUpdate(cleanText);
        }
        return {
          text: cleanText,
          sourceDocuments: (data.source_documents || []).filter(doc =>
            !doc.includes('storage compatibility issue')
          )
        };
      } else {
        // Handle text stream response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let receivedText = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          receivedText += chunk;

          // Call the callback with updated text for real-time updates
          if (onStreamUpdate) {
            // Clean the text by removing "llm_answer:" prefix if present
            let cleanText = receivedText.replace(/^llm_answer:\s*/, '');

            // Filter out storage compatibility messages
            if (cleanText.includes('storage compatibility issue')) {
              cleanText = cleanText.replace(/Note: Content retrieval not available due to storage compatibility issue/g, '').trim();
              cleanText = cleanText.replace(/\s+/g, ' ').trim(); // Clean up extra spaces
            }

            onStreamUpdate(cleanText);
          }
        }

        // Clean the final text by removing "llm_answer:" prefix if present
        let cleanFinalText = receivedText.replace(/^llm_answer:\s*/, '');

        // Filter out storage compatibility messages
        if (cleanFinalText.includes('storage compatibility issue')) {
          cleanFinalText = cleanFinalText.replace(/Note: Content retrieval not available due to storage compatibility issue/g, '').trim();
          cleanFinalText = cleanFinalText.replace(/\s+/g, ' ').trim(); // Clean up extra spaces
        }

        // Try to get source documents from the response if available
        // For text streams, we need to check if there's a way to get source docs
        // This depends on how your backend sends the data
        return { text: cleanFinalText, sourceDocuments: [] };
      }
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }, [API_BASE_URL]);

  // Ask-selected endpoint for questions about selected text - with streaming support
  const askSelected = useCallback(async (selectedText, question, onStreamUpdate) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ask-selected`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selected_text: selectedText,
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ask selected request failed with status: ${response.status}`);
      }

      // Check if the response is JSON or text stream
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // Handle JSON response
        const data = await response.json();
        let cleanText = data.llm_answer || data.text || data.response || '';

        // Filter out storage compatibility messages
        if (cleanText.includes('storage compatibility issue')) {
          cleanText = cleanText.replace(/Note: Content retrieval not available due to storage compatibility issue/g, '').trim();
          cleanText = cleanText.replace(/\s+/g, ' ').trim(); // Clean up extra spaces
        }

        if (onStreamUpdate) {
          onStreamUpdate(cleanText);
        }
        return {
          text: cleanText,
          sourceDocuments: (data.source_documents || []).filter(doc =>
            !doc.includes('storage compatibility issue')
          )
        };
      } else {
        // Handle text stream response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let receivedText = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          receivedText += chunk;

          // Call the callback with updated text for real-time updates
          if (onStreamUpdate) {
            // Clean the text by removing "llm_answer:" prefix if present
            let cleanText = receivedText.replace(/^llm_answer:\s*/, '');

            // Filter out storage compatibility messages
            if (cleanText.includes('storage compatibility issue')) {
              cleanText = cleanText.replace(/Note: Content retrieval not available due to storage compatibility issue/g, '').trim();
              cleanText = cleanText.replace(/\s+/g, ' ').trim(); // Clean up extra spaces
            }

            onStreamUpdate(cleanText);
          }
        }

        // Clean the final text by removing "llm_answer:" prefix if present
        let cleanFinalText = receivedText.replace(/^llm_answer:\s*/, '');

        // Filter out storage compatibility messages
        if (cleanFinalText.includes('storage compatibility issue')) {
          cleanFinalText = cleanFinalText.replace(/Note: Content retrieval not available due to storage compatibility issue/g, '').trim();
          cleanFinalText = cleanFinalText.replace(/\s+/g, ' ').trim(); // Clean up extra spaces
        }

        return { text: cleanFinalText };
      }
    } catch (error) {
      console.error('Ask selected error:', error);
      throw error;
    }
  }, [API_BASE_URL]);

  // Ingest-content endpoint for content ingestion
  const ingestContent = useCallback(async (content, metadata = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ingest-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          metadata,
        }),
      });

      if (!response.ok) {
        throw new Error(`Content ingestion failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Content ingestion error:', error);
      throw error;
    }
  }, [API_BASE_URL]);

  return {
    healthCheck,
    query,
    askSelected,
    ingestContent,
    API_BASE_URL
  };
};