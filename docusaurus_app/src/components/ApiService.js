import { useCallback } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useApiService = () => {
  const { siteConfig } = useDocusaurusContext();

  // ✅ Base URL (from Docusaurus config or fallback)
  const RAW_BASE_URL = siteConfig.customFields.FASTAPI_BASE_URL || 'http://localhost:8000';
  const API_BASE_URL = RAW_BASE_URL.replace(/\/$/, ''); // Remove trailing slash

  // -------------------------
  // Health check
  // -------------------------
  const healthCheck = useCallback(async () => {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (!res.ok) throw new Error("Health check failed");
    return res.json();
  }, [API_BASE_URL]);

  // -------------------------
  // General query
  // -------------------------
  const query = useCallback(async (question, onStreamUpdate) => {
    const res = await fetch(`${API_BASE_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }) // ✅ backend expects `question`
    });

    if (!res.ok) {
      throw new Error("Query failed");
    }

    const data = await res.json();

    if (onStreamUpdate) onStreamUpdate(data.llm_answer);

    return {
      text: data.llm_answer,
      sourceDocuments: data.source_documents || []
    };
  }, [API_BASE_URL]);

  // -------------------------
  // Ask about selected text
  // -------------------------
  const askSelected = useCallback(async (selectedText, question, onStreamUpdate) => {
    const res = await fetch(`${API_BASE_URL}/api/ask-selected`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selected_text: selectedText,
        question // ✅ backend expects `question`
      })
    });

    if (!res.ok) {
      throw new Error("Ask-selected failed");
    }

    const data = await res.json();

    if (onStreamUpdate) onStreamUpdate(data.llm_answer);

    return {
      text: data.llm_answer,
      sourceDocuments: data.source_documents || []
    };
  }, [API_BASE_URL]);

  return {
    API_BASE_URL,
    healthCheck,
    query,
    askSelected
  };
};
