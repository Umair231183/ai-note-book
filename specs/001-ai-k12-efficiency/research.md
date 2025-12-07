# Research Notes & RAG Chatbot Design

## 1. RAG Chatbot Architecture

### 1.1 Components

- **User Interface (UI)**: Docusaurus React component for user input and displaying chatbot responses.
- **API Gateway/Backend Service**: A lightweight Python Flask/FastAPI application to handle requests from the UI.
- **Retriever**: Responsible for fetching relevant document chunks from the knowledge base based on the user's query.
  - **Embedding Model**: Transforms text (document chunks, user queries) into numerical vector representations.
  - **Vector Database**: Stores the embedded document chunks and facilitates efficient similarity search.
- **Generator (LLM)**: A large language model (e.g., Claude, OpenAI GPT) that synthesizes the retrieved information into a coherent and contextually relevant answer.
- **Knowledge Base**: The collection of all research paper chapters and supplementary materials, processed and chunked for retrieval.

### 1.2 Data Flow

1.  **User Query**: User types a question into the Docusaurus UI chatbot.
2.  **UI to Backend**: The UI sends the user's query to the Backend Service via an API endpoint.
3.  **Query Embedding**: The Backend Service takes the user query and uses the Embedding Model to convert it into a vector embedding.
4.  **Retrieval**: The query embedding is sent to the Vector Database, which performs a similarity search to find the most relevant document chunks from the Knowledge Base.
5.  **Context Augmentation**: The retrieved document chunks are sent back to the Backend Service.
6.  **Prompt Engineering**: The Backend Service constructs a prompt for the Generator (LLM) that includes the original user query and the retrieved document chunks as context.
7.  **Response Generation**: The Generator (LLM) processes the augmented prompt and generates a natural language response.
8.  **Backend to UI**: The Backend Service sends the LLM's response back to the UI.
9.  **Display Response**: The UI displays the chatbot's answer to the user.

### 1.3 Knowledge Base Preparation

1.  **Document Loading**: Load all Markdown files from `specs/001-ai-k12-efficiency/chapters/` and any other relevant research documents.
2.  **Text Splitting/Chunking**: Divide the loaded documents into smaller, manageable chunks (e.g., paragraphs, sentences, or fixed-size chunks with overlap) to optimize retrieval.
3.  **Embedding Generation**: For each chunk, generate a vector embedding using the Embedding Model.
4.  **Vector Storage**: Store the chunks and their corresponding embeddings in the Vector Database.

### 1.4 Design Choices

Based on the architectural components outlined above, the following specific technologies have been selected for the implementation of the RAG chatbot:

-   **Backend Service**: **FastAPI (Python)**
    -   **Reasoning**: FastAPI is a modern, high-performance web framework for Python that is easy to learn and use. Its asynchronous capabilities are well-suited for handling I/O-bound operations like interacting with a vector database and an external LLM API.

-   **Embedding Model**: **Sentence-Transformers (`all-MiniLM-L6-v2`)**
    -   **Reasoning**: This is a high-quality, lightweight model that provides excellent performance for semantic search and can be run locally. It offers a good balance between speed and accuracy for generating document embeddings.

-   **Vector Database**: **Chroma DB (In-memory)**
    -   **Reasoning**: Chroma is an open-source, developer-friendly vector database that is easy to set up and integrate into a Python application. For the scope of this project, the in-memory storage option is sufficient and avoids the complexity of setting up a separate database server.

-   **Generator (LLM)**: **Generic LLM API**
    -   **Reasoning**: A specific LLM provider is not dictated by the project requirements. The backend will be designed to interact with a generic LLM API endpoint. This will involve creating a modular client that can be easily configured with the appropriate API key and endpoint URL for a service like OpenAI's GPT, Anthropic's Claude, or another provider. This approach ensures flexibility and decouples the application from a single LLM vendor.