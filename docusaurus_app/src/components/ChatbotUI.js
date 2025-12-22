import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatbotUI.module.css'; // Import CSS module
import clsx from 'clsx'; // For conditional class names
import { useApiService } from './ApiService';

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
  const { query, askSelected } = useApiService();

  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m your AI research assistant. Ask me anything about the research paper.' }
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
    setInputValue('');
    setIsLoading(true);

    // Add user and bot messages, then make the API call
    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      newMessages.push(userMessage); // Add user message at index: prevMessages.length
      newMessages.push({ sender: 'bot', text: '', sourceDocuments: [] }); // Add bot message at index: prevMessages.length + 1
      return newMessages;
    });

    try {
      // Use a callback to get the correct index after the state is updated
      // We'll add the messages first, then perform the API call
      // Calculate the index for the bot message: current messages + user message + bot message = current + 2
      // So the bot message will be at index: messages.length + 1 (since we add user first, then bot)

      // For streaming, we need to make the API call with streaming but also get the full response
      // First, make the call with streaming to update the UI in real-time
      let response;
      if (selectedText) {
        // Use ask-selected endpoint when text is selected
        response = await askSelected(selectedText, inputValue, (updatedText) => {
          setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            // The bot message is at the last index
            if (newMessages.length > 0) {
              const botMsgIndex = newMessages.length - 1;
              if (newMessages[botMsgIndex] && newMessages[botMsgIndex].sender === 'bot') {
                newMessages[botMsgIndex].text = updatedText;
              }
            }
            return newMessages;
          });
        });
      } else {
        // Use query endpoint for general questions
        response = await query(inputValue, (updatedText) => {
          setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            // The bot message is at the last index
            if (newMessages.length > 0) {
              const botMsgIndex = newMessages.length - 1;
              if (newMessages[botMsgIndex] && newMessages[botMsgIndex].sender === 'bot') {
                newMessages[botMsgIndex].text = updatedText;
              }
            }
            return newMessages;
          });
        });
      }

      // Update the final message with the complete response including source documents
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        // The bot message is at the last index
        if (newMessages.length > 0) {
          const botMsgIndex = newMessages.length - 1;
          if (newMessages[botMsgIndex]) {
            newMessages[botMsgIndex].text = response.text;
            newMessages[botMsgIndex].sourceDocuments = response.sourceDocuments || [];
          }
        }
        return newMessages;
      });

    } catch (error) {
      console.error("Failed to fetch from chatbot API:", error);
      const errorMessage = { sender: 'bot', text: 'Sorry, I am having trouble connecting to my brain. Please try again later.' };
      setMessages(prevMessages => {
        // Update the last (incomplete) bot message with the error message
        const newMessages = [...prevMessages];
        if (newMessages.length > 0) {
          const lastMessageIndex = newMessages.length - 1;
          if (newMessages[lastMessageIndex].sender === 'bot') {
            newMessages[lastMessageIndex] = errorMessage;
          }
        }
        return newMessages;
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
          <div
            key={index}
            className={clsx(styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage)}
          >
            {msg.sender === 'user' ? (
              <div className={styles.userMessageContent}>
                <div className={styles.messageText}>{msg.text}</div>
                <div className={styles.messageTime}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
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
                        {msg.sourceDocuments.map((source, srcIndex) => (
                          <li key={srcIndex} className={styles.sourceItem}>📄 {source}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className={styles.messageTime}>
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={clsx(styles.message, styles.botMessage)}>
            <div className={styles.botMessageContent}>
              <div className={styles.botAvatarSmall}>🤖</div>
              <div className={styles.messageText}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
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
        <button type="submit" className={styles.sendButton} disabled={isLoading}>
          ✨
        </button>
      </form>
    </div>
  );
};

export default ChatbotUI;