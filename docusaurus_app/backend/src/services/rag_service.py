from typing import List, Dict, Any
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_cohere import CohereEmbeddings
from langchain_qdrant import Qdrant
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import os
from dotenv import load_dotenv
from .vector_store_service import VectorStoreService

# Try to import OpenRouter, but make it optional
try:
    from langchain_openai import ChatOpenAI as OpenRouterChat  # Using OpenAI compatible interface
    OPENROUTER_AVAILABLE = True

    # Define a custom OpenRouter class that uses the OpenRouter API
    class ChatOpenRouter:
        def __init__(self, model="openai/gpt-3.5-turbo", temperature=0.1, openrouter_api_key=None):
            # Use OpenAI compatible interface but with OpenRouter base URL
            import os
            os.environ["OPENAI_API_BASE"] = "https://openrouter.ai/api/v1"
            os.environ["OPENAI_API_KEY"] = openrouter_api_key
            self._llm = OpenRouterChat(
                model_name=model,
                temperature=temperature,
                openai_api_key=openrouter_api_key,
                openai_api_base="https://openrouter.ai/api/v1"
            )

        def invoke(self, input_data):
            return self._llm.invoke(input_data)

        def __call__(self, input_data):
            return self._llm(input_data)

except ImportError:
    print("Warning: Could not set up OpenRouter. Using OpenAI as fallback.")
    OPENROUTER_AVAILABLE = False
    ChatOpenRouter = None

# Load environment variables
load_dotenv()

class RAGService:
    """
    Service for implementing the RAG (Retrieval-Augmented Generation) functionality.
    """

    def __init__(self):
        """
        Initialize the RAG service with necessary components.
        """
        # Check for OpenRouter API key first (preferred for hackathon)
        self.openrouter_api_key = os.getenv("OPENROUTER_API_KEY")
        # Check for Cohere API key for embeddings
        self.cohere_api_key = os.getenv("COHERE_API_KEY")
        # Fallback to OpenAI
        self.openai_api_key = os.getenv("OPENAI_API_KEY")

        # Determine which services to use based on available API keys
        use_openrouter = self.openrouter_api_key and self.openrouter_api_key != "your-openrouter-api-key-here"
        use_cohere = self.cohere_api_key and self.cohere_api_key != "your-cohere-api-key-here"

        if not use_openrouter and (not self.openai_api_key or self.openai_api_key == "sk-your-openai-api-key-here"):
            print("Warning: No valid API keys found. Using mock responses.")
            self.qa_chain = None
            # Still initialize vector store service for ingestion capabilities
            try:
                self.vector_store_service = VectorStoreService()
            except Exception as e:
                print(f"Could not initialize vector store service: {e}")
                self.vector_store_service = None
            return

        try:
            # Initialize the vector store service
            self.vector_store_service = VectorStoreService()

            # Initialize the language model based on available API keys
            if use_openrouter and OPENROUTER_AVAILABLE:
                self.llm = ChatOpenRouter(
                    model="openai/gpt-3.5-turbo",  # or any other model you prefer
                    temperature=0.1,
                    openrouter_api_key=self.openrouter_api_key
                )
                print("Using OpenRouter for LLM")
            else:
                # Fallback to OpenAI
                self.llm = ChatOpenAI(
                    model_name="gpt-3.5-turbo",
                    temperature=0.1,
                    api_key=self.openai_api_key
                )
                print("Using OpenAI for LLM")

            # Initialize embeddings based on available API keys
            if use_cohere:
                self.embeddings = CohereEmbeddings(
                    cohere_api_key=self.cohere_api_key,
                    model="embed-english-v3.0"  # or another Cohere embedding model
                )
                print("Using Cohere for embeddings")
                # Update vector store for Cohere embeddings (1024 dimensions for embed-english-v3.0)
                self.vector_store_service.update_embedding_dimensions(1024)
            else:
                # Fallback to OpenAI embeddings
                self.embeddings = OpenAIEmbeddings(api_key=self.openai_api_key)
                print("Using OpenAI for embeddings")

            # Set up the retrieval chain
            self.qdrant_client = self.vector_store_service.client
            self.collection_name = self.vector_store_service.collection_name

            # Check if we can use Qdrant properly or need to use fallback
            # Try to create a simple test to see if the client is compatible
            try:
                # Initialize Qdrant vector store for LangChain
                self.qdrant_vectorstore = Qdrant(
                    client=self.qdrant_client,
                    collection_name=self.collection_name,
                    embeddings=self.embeddings,
                )

                # Try to create a retriever to see if it works
                self.retriever = self.qdrant_vectorstore.as_retriever(search_kwargs={"k": 5})

                # If we get here, the Qdrant setup is working
                # Create the QA chain using the newer LangChain API
                template = """Answer the question based only on the following context:
                {context}

                Question: {question}
                """
                prompt = PromptTemplate.from_template(template)

                # Create a chain that combines the retriever with the LLM
                def format_docs(docs):
                    return "\n\n".join(doc.page_content for doc in docs)

                self.qa_chain = (
                    {"context": self.retriever | format_docs, "question": RunnablePassthrough()}
                    | prompt
                    | self.llm
                    | StrOutputParser()
                )
                print("RAG service initialized successfully with full functionality")

            except Exception as e:
                print(f"Warning: Could not fully initialize Qdrant vector store: {e}")
                print("RAG will work but without content retrieval capability")
                # For this case, we'll create a simple chain that uses the LLM directly
                # This means it won't use the stored content but will still generate responses
                template = """You are an AI assistant. A user has asked a question.
                Even though you don't have access to specific context, do your best to answer based on your general knowledge.

                Question: {question}

                Answer:"""

                prompt = PromptTemplate.from_template(template)

                self.qa_chain = (
                    {"question": RunnablePassthrough()}
                    | prompt
                    | self.llm
                    | StrOutputParser()
                )
                print("RAG service initialized with fallback functionality")

        except Exception as e:
            print(f"Error initializing RAG service: {e}")
            # Create a completely mock response system
            self.qa_chain = None

    def query(self, question: str) -> Dict[str, Any]:
        """
        Process a question and return an answer with citations.

        Args:
            question: The user's question about the textbook content

        Returns:
            A dictionary containing the answer and source citations
        """
        if self.qa_chain is None:
            # Return a more helpful mock response when RAG is not available
            return {
                "llm_answer": f"I can help answer your question: '{question}'. However, the RAG system is not fully configured. Please make sure you have set a valid OPENAI_API_KEY in your environment variables.",
                "source_documents": []
            }

        try:
            # Try to use the QA chain, but handle the Qdrant search error specifically
            try:
                answer = self.qa_chain.invoke(question)

                # If the chain worked, try to separately get source documents
                try:
                    # For the newer API, we need to separately get the source documents
                    # since they're not returned by the chain directly
                    source_docs = self.retriever.invoke(question)
                    source_doc_names = []
                    for doc in source_docs:
                        if hasattr(doc, 'metadata') and 'source' in doc.metadata:
                            source_doc_names.append(doc.metadata['source'])
                        else:
                            source_doc_names.append("Unknown source")
                except AttributeError as e:
                    if "'search'" in str(e):
                        # This is the Qdrant in-memory compatibility issue
                        source_doc_names = ["Note: Content retrieval not available due to storage compatibility issue"]
                    else:
                        source_doc_names = ["Unknown source"]
                except Exception:
                    source_doc_names = ["Unknown source"]

                return {
                    "llm_answer": answer,
                    "source_documents": source_doc_names
                }
            except AttributeError as e:
                if "'search'" in str(e):
                    # The chain itself failed due to Qdrant search issue, use a direct LLM call
                    # Create a simple prompt without context
                    simple_template = """You are an AI assistant. A user has asked a question.
                    Even though you don't have access to specific context, do your best to answer based on your general knowledge.

                    Question: {question}

                    Answer:"""

                    from langchain_core.prompts import PromptTemplate
                    from langchain_core.output_parsers import StrOutputParser

                    # Create the response using the LLM directly
                    simple_prompt = PromptTemplate.from_template(simple_template)
                    formatted_prompt = simple_prompt.format(question=question)
                    response = self.llm.invoke(formatted_prompt)
                    answer = str(response.content) if hasattr(response, 'content') else str(response)
                    return {
                        "llm_answer": answer,
                        "source_documents": ["Note: Content retrieval not available due to storage compatibility issue"]
                    }
                else:
                    raise e  # Re-raise if it's a different error
        except Exception as e:
            # If there's an error, return a helpful message
            return {
                "llm_answer": f"I encountered an error processing your question: {str(e)}",
                "source_documents": []
            }

    def ask_selected_text(self, selected_text: str, question: str) -> Dict[str, Any]:
        """
        Process a question about selected text and return an answer with citations.

        Args:
            selected_text: The text selected by the user
            question: The user's question about the selected text

        Returns:
            A dictionary containing the answer and source citations
        """
        if self.qa_chain is None:
            # Return a more helpful mock response when RAG is not available
            return {
                "llm_answer": f"I can help answer your question about the selected text. Question: '{question}'. However, the RAG system is not fully configured. Please make sure you have set a valid OPENAI_API_KEY in your environment variables.",
                "source_documents": []
            }

        # Create a specific prompt for selected text questions
        enhanced_question = f"Based on the following text: '{selected_text}', {question}"

        try:
            # Try to use the QA chain, but handle the Qdrant search error specifically
            try:
                answer = self.qa_chain.invoke(enhanced_question)

                # If the chain worked, try to separately get source documents
                try:
                    # For the newer API, we need to separately get the source documents
                    # since they're not returned by the chain directly
                    source_docs = self.retriever.invoke(enhanced_question)
                    source_doc_names = []
                    for doc in source_docs:
                        if hasattr(doc, 'metadata') and 'source' in doc.metadata:
                            source_doc_names.append(doc.metadata['source'])
                        else:
                            source_doc_names.append("Unknown source")
                except AttributeError as e:
                    if "'search'" in str(e):
                        # This is the Qdrant in-memory compatibility issue
                        source_doc_names = ["Note: Content retrieval not available due to storage compatibility issue"]
                    else:
                        source_doc_names = ["Unknown source"]
                except Exception:
                    source_doc_names = ["Unknown source"]

                return {
                    "llm_answer": answer,
                    "source_documents": source_doc_names
                }
            except AttributeError as e:
                if "'search'" in str(e):
                    # The chain itself failed due to Qdrant search issue, use a direct LLM call
                    # Create a simple prompt without context
                    simple_template = """You are an AI assistant. A user has asked a question about selected text.
                    Even though you don't have access to specific context, do your best to answer based on your general knowledge.

                    Selected Text: {selected_text}
                    Question: {question}

                    Answer:"""

                    from langchain_core.prompts import PromptTemplate
                    from langchain_core.output_parsers import StrOutputParser

                    # Create the response using the LLM directly
                    simple_prompt = PromptTemplate.from_template(simple_template)
                    formatted_prompt = simple_prompt.format(selected_text=selected_text, question=question)
                    response = self.llm.invoke(formatted_prompt)
                    answer = str(response.content) if hasattr(response, 'content') else str(response)
                    return {
                        "llm_answer": answer,
                        "source_documents": ["Note: Content retrieval not available due to storage compatibility issue"]
                    }
                else:
                    raise e  # Re-raise if it's a different error
        except Exception as e:
            # If there's an error, return a helpful message
            return {
                "llm_answer": f"I encountered an error processing your question about the selected text: {str(e)}",
                "source_documents": []
            }

    def safety_check(self, response: str) -> bool:
        """
        Perform a safety check on the generated response.

        Args:
            response: The generated response to check

        Returns:
            True if the response passes safety checks, False otherwise
        """
        # In a real implementation, we would implement safety checks
        # to ensure the response is appropriate and doesn't contain harmful content
        # For now, we'll just check for some basic safety criteria

        # Convert response to lowercase for comparison
        lower_response = response.lower()

        # Check for harmful content
        harmful_keywords = [
            "harmful", "offensive", "inappropriate", "malicious",
            "dangerous", "threatening", "violence", "hate"
        ]

        for keyword in harmful_keywords:
            if keyword in lower_response:
                return False

        return True