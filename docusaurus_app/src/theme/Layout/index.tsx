import React, {type ReactNode, useState} from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import FloatChatButton from '@site/src/components/FloatChatButton';
import ChatbotUI from '@site/src/components/ChatbotUI'; // Import ChatbotUI

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleChatButtonClick = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      <Layout {...props} />
      <FloatChatButton onClick={handleChatButtonClick} />
      {isChatbotOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px', // Above the button
          right: '20px',
          width: '350px',
          height: '500px',
          backgroundColor: 'var(--ifm-background-color)',
          border: '1px solid var(--ifm-toc-border-color)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '10px'
        }}>
          <ChatbotUI />
          <button onClick={handleChatButtonClick} style={{ marginTop: '10px' }}>Close</button>
        </div>
      )}
    </>
  );
}
