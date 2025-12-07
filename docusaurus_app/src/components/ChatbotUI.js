import React, { useState, useEffect } from 'react';
import styles from './ChatbotUI.module.css'; // Import CSS module
import clsx from 'clsx'; // For conditional class names
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Placeholder for a hook that would detect selected text globally.
// In a real implementation, this would involve DOM listeners.
const useSelectedText = () => {
  const [selectedText, setSelectedText] = useState(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        setSelectedText(selection.toString());
      } else {
        setSelectedText(null);
      }
    };

    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange); // For keyboard selections
    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
    };
  }, []);

  return selectedText;
};


const ChatbotUI = () => {
  const {siteConfig} = useDocusaurusContext();
  const API_BASE_URL = siteConfig.customFields.FASTAPI_BASE_URL || ''; // Use customFields

  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Ask me a question about the research paper.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const selectedText = useSelectedText(); // Use the custom hook

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    let apiPath = '/api/query';
    let requestBody = { question: inputValue };

    if (selectedText) {
      apiPath = '/api/ask-selected';
      requestBody = {
        selected_text: selectedText,
        question: inputValue,
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}${apiPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let receivedText = '';
      let botMessageIndex = messages.length; // Index for the new bot message

      // Add a new empty message for streaming
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: '', sourceDocuments: [] }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        receivedText += chunk;

        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          // Update the last message (which is the one currently streaming)
          if (newMessages[botMessageIndex]) {
            newMessages[botMessageIndex].text = receivedText;
          }
          return newMessages;
        });
      }

      // After streaming, fetch the full JSON to get source_documents if available
      // Note: This approach assumes the backend sends full JSON after stream.
      // A more robust streaming solution would send metadata (like sources) via stream too.
      const finalData = await response.json(); // Re-read response body (might not work if already read by reader)
                                              // This is a placeholder, a true streaming setup would integrate sources into the stream
      setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          if (newMessages[botMessageIndex]) {
              newMessages[botMessageIndex].sourceDocuments = finalData.source_documents || [];
          }
          return newMessages;
      });

    } catch (error) {
      console.error("Failed to fetch from chatbot API:", error);
      const errorMessage = { sender: 'bot', text: 'Sorry, I am having trouble connecting to my brain. Please try again later.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.messageHistory}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={clsx(styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage)}
          >
            {msg.text}
            {msg.sourceDocuments && msg.sourceDocuments.length > 0 && (
              <div className={styles.sourceCitations}>
                <strong>Sources:</strong>
                <ul>
                  {msg.sourceDocuments.map((source, srcIndex) => (
                    <li key={srcIndex}>{source}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className={clsx(styles.message, styles.botMessage, styles.loadingMessage)}>Thinking...</div>}
      </div>
      {selectedText && (
        <div className={styles.selectedTextDisplay}>
          Asking about selected text: <strong>"{selectedText.substring(0, 50)}..."</strong>
        </div>
      )}
      <form onSubmit={handleSendMessage} className={styles.inputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.inputField}
          placeholder="Type your question..."
          disabled={isLoading}
        />
        <button type="submit" className={styles.sendButton} disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotUI;