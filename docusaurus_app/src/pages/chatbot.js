import React from 'react';
import Layout from '@theme/Layout';
import ChatbotUI from '@site/src/components/ChatbotUI';

function ChatbotPage() {
  return (
    <Layout
      title="Chatbot"
      description="An interactive chatbot to answer questions about the research paper."
    >
      <div className="container margin-vert--lg">
        <div className="text--center">
          <h1>Research Paper Chatbot</h1>
          <p>
            This is an interactive RAG (Retrieval-Augmented Generation) chatbot.
            <br />
            You can ask it questions about the research paper on "AI’s Impact on K-12 Classroom Efficiency."
          </p>
        </div>
        <ChatbotUI />
      </div>
    </Layout>
  );
}

export default ChatbotPage;