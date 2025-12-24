import React, { useState, useEffect } from 'react';
import styles from './ChatbotUI.module.css'; // CSS module
import clsx from 'clsx'; // Conditional class names
import { useApiService } from './ApiService';

// Hook to detect selected text
const useSelectedText = () => {
  const [selectedText, setSelectedText] = useState(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      setSelectedText(selection && selection.toString().trim() ? selection.toString() : null);
    };

    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
    };
  }, []);

  return selectedText;
};

const ChatbotUI = () => {
  const { query, askSelected } = useApiService();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your AI research assistant. Ask me anything about the research paper." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const selectedText = useSelectedText();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setInputValue('');
    setIsLoading(true);

    // Add user message and placeholder bot message
    setMessages(prev => [...prev, userMessage, { sender: 'bot', text: '', sourceDocuments: [] }]);

    try {
      let response;
      if (selectedText) {
        response = await askSelected(selectedText, inputValue, (updatedText) => {
          setMessages(prevMessages => {
            const msgs = [...prevMessages];
            const botIndex = msgs.length - 1;
            msgs[botIndex].text = updatedText;
            return msgs;
          });
        });
      } else {
        response = await query(inputValue, (updatedText) => {
          setMessages(prevMessages => {
            const msgs = [...prevMessages];
            const botIndex = msgs.length - 1;
            msgs[botIndex].text = updatedText;
            return msgs;
          });
        });
      }

      // Update bot message with final response
      setMessages(prevMessages => {
        const msgs = [...prevMessages];
        const botIndex = msgs.length - 1;
        msgs[botIndex].text = response.text;
        msgs[botIndex].sourceDocuments = response.sourceDocuments || [];
        return msgs;
      });

    } catch (error) {
      console.error("Failed to fetch from chatbot API:", error);
      const errorMessage = { sender: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' };
      setMessages(prevMessages => {
        const msgs = [...prevMessages];
        const botIndex = msgs.length - 1;
        msgs[botIndex] = errorMessage;
        return msgs;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.headerContent}>
          <div className={styles.botAvatar}>🤖</div>
          <div>
            <h3>AI Research Assistant</h3>
            <p className={styles.statusText}>Online • Ready to help</p>
          </div>
        </div>
      </div>

      <div className={styles.messageHistory}>
        {messages.map((msg, index) => (
          <div key={index} className={clsx(styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage)}>
            {msg.sender === 'user' ? (
              <div className={styles.userMessageContent}>
                <div className={styles.messageText}>{msg.text}</div>
                <div className={styles.messageTime}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            ) : (
              <div className={styles.botMessageContent}>
                <div className={styles.botAvatarSmall}>🤖</div>
                <div className={styles.messageText}>
                  {msg.text}
                  {msg.sourceDocuments && msg.sourceDocuments.length > 0 && (
                    <div className={styles.sourceCitations}>
                      <strong>Sources:</strong>
                      <ul>
                        {msg.sourceDocuments.map((source, idx) => (
                          <li key={idx} className={styles.sourceItem}>📄 {source}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className={styles.messageTime}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={clsx(styles.message, styles.botMessage)}>
            <div className={styles.botMessageContent}>
              <div className={styles.botAvatarSmall}>🤖</div>
              <div className={styles.messageText}>
                <div className={styles.typingIndicator}><span></span><span></span><span></span></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedText && (
        <div className={styles.selectedTextDisplay}>
          <small>Asking about: <strong>"{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"</strong></small>
        </div>
      )}

      <form onSubmit={handleSendMessage} className={styles.inputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.inputField}
          placeholder="Ask a question about the research paper..."
          disabled={isLoading}
        />
        <button type="submit" className={styles.sendButton} disabled={isLoading}>✨</button>
      </form>
    </div>
  );
};

export default ChatbotUI;
