from typing import List
from pathlib import Path

# Updated imports for LangChain v0.1.0+
from langchain_openai import OpenAIEmbeddings, OpenAI # Moved from langchain.embeddings, langchain.llms
from langchain.chains import RetrievalQA
# Removed: from langchain.vectorstores import FAISS

# ------------------------------
# CONFIGURATION
# ------------------------------

# Removed: VECTORSTORE_PATH, OPENAI_API_KEY as these are now handled by RAGService/main.py

# ------------------------------
# Simplified RAGChatbot - relies on external QA Chain
# ------------------------------

class RAGChatbot:
    """
    Simplified RAGChatbot that takes an initialized QA chain.
    The vectorstore loading and QA chain initialization logic is now handled by RAGService.
    """
    def __init__(self, qa_chain: RetrievalQA):
        self.qa_chain = qa_chain

    def ask(self, query: str) -> dict:
        """
        Ask a question to the RAG chatbot.
        Returns a dictionary containing the answer and source documents.
        """
        # The QA chain already configured to return source documents
        result = self.qa_chain.invoke({"query": query}) # Use .invoke for dict input/output
        
        # Extract source documents for citation
        source_documents = [doc.metadata.get('source', 'Unknown') for doc in result.get('source_documents', [])]

        return {
            "llm_answer": result.get('result'),
            "source_documents": source_documents
        }

