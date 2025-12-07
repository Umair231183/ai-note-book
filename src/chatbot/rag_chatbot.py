# Core RAG Chatbot Functionality
# This script implements the backend for a Retrieval-Augmented Generation (RAG) chatbot.
# Based on the design in: specs/001-ai-k12-efficiency/research.md

import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# --- Third-party libraries for RAG ---
# These would need to be installed via pip:
# pip install "fastapi[all]" "sentence-transformers" "chromadb"
import chromadb
from sentence_transformers import SentenceTransformer

# --- Application Setup ---
app = FastAPI(
    title="AI K-12 Research Paper RAG Chatbot",
    description="A chatbot that can answer questions about the AI in K-12 Education research paper.",
)

# --- Configuration ---
KNOWLEDGE_BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../specs/001-ai-k12-efficiency/chapters'))
EMBEDDING_MODEL_NAME = 'all-MiniLM-L6-v2'
CHROMA_COLLECTION_NAME = "ai_k12_research"

# --- In-memory RAG Components ---
# In a production scenario, the Chroma client might connect to a persistent server.
# For this project, an in-memory instance is sufficient.
chroma_client = chromadb.Client()
# The embedding model is loaded once when the application starts.
embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

# --- Data Models ---
class Query(BaseModel):
    question: str
    top_k: int = 3

class RetrievedChunk(BaseModel):
    id: str
    text: str
    distance: float

class QueryResponse(BaseModel):
    retrieved_chunks: list[RetrievedChunk]
    # In a full implementation, the LLM's answer would be here.
    llm_answer: str

# --- Core RAG Functions ---

def load_and_chunk_documents(path: str) -> list[dict]:
    """
    Loads all Markdown files from a given path, splits them into chunks (paragraphs),
    and returns a list of dictionaries, each containing the chunk's ID and text.
    """
    documents = []
    doc_id_counter = 0
    for filename in os.listdir(path):
        if filename.endswith(".md"):
            filepath = os.path.join(path, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                # Simple chunking strategy: split by paragraph.
                chunks = content.split('\n\n')
                for i, chunk_text in enumerate(chunks):
                    if chunk_text.strip(): # Ignore empty paragraphs
                        doc_id = f"{filename}_chunk_{i}"
                        documents.append({"id": doc_id, "text": chunk_text})
                        doc_id_counter += 1
            except Exception as e:
                print(f"Error reading or chunking file {filename}: {e}")
    print(f"Loaded and chunked {doc_id_counter} documents from {path}")
    return documents

def initialize_vector_store():
    """
    Initializes the ChromaDB vector store. It loads documents, generates embeddings,
    and populates the collection. This is intended to be called once at startup.
    """
    print("Initializing vector store...")
    try:
        # Check if collection already exists and delete it to ensure freshness
        if CHROMA_COLLECTION_NAME in [c.name for c in chroma_client.list_collections()]:
            chroma_client.delete_collection(name=CHROMA_COLLECTION_NAME)
            print(f"Deleted existing collection: {CHROMA_COLLECTION_NAME}")

        collection = chroma_client.create_collection(name=CHROMA_COLLECTION_NAME)
        
        documents = load_and_chunk_documents(KNOWLEDGE_BASE_DIR)
        if not documents:
            print("No documents found to initialize the vector store.")
            return

        doc_texts = [doc['text'] for doc in documents]
        doc_ids = [doc['id'] for doc in documents]

        print(f"Generating embeddings for {len(doc_texts)} document chunks...")
        embeddings = embedding_model.encode(doc_texts, show_progress_bar=True)
        
        print("Adding documents to ChromaDB collection...")
        collection.add(
            embeddings=embeddings.tolist(),
            documents=doc_texts,
            ids=doc_ids
        )
        print(f"Vector store initialized. Collection '{CHROMA_COLLECTION_NAME}' contains {collection.count()} items.")

    except Exception as e:
        print(f"An error occurred during vector store initialization: {e}")
        # Depending on the application's needs, you might want to raise the exception
        # or handle it in a way that the app can still run, albeit without RAG functionality.
        raise

def retrieve_from_vector_store(query_text: str, top_k: int) -> list[RetrievedChunk]:
    """
    Retrieves the most relevant document chunks for a given query.
    """
    try:
        collection = chroma_client.get_collection(name=CHROMA_COLLECTION_NAME)
        query_embedding = embedding_model.encode([query_text])[0]
        
        results = collection.query(
            query_embeddings=[query_embedding.tolist()],
            n_results=top_k
        )
        
        retrieved = []
        if results and results['ids'][0]:
            for i, doc_id in enumerate(results['ids'][0]):
                retrieved.append(RetrievedChunk(
                    id=doc_id,
                    text=results['documents'][0][i],
                    distance=results['distances'][0][i]
                ))
        return retrieved
    except Exception as e:
        # This will catch errors if the collection doesn't exist.
        print(f"Error retrieving from vector store: {e}")
        raise HTTPException(status_code=500, detail="Could not retrieve from vector store. Is it initialized?")


# --- FastAPI Endpoints ---

@app.on_event("startup")
def on_startup():
    """
    FastAPI startup event handler. This will trigger the vector store initialization.
    """
    initialize_vector_store()

@app.post("/api/query", response_model=QueryResponse)
async def handle_query(query: Query):
    """
    The main endpoint for the chatbot. It takes a user's question,
    retrieves relevant context, and (in a full implementation) would use an LLM
    to generate an answer.
    """
    print(f"Received query: {query.question}")
    retrieved_chunks = retrieve_from_vector_store(query.question, query.top_k)
    
    # --- Placeholder for Generator (LLM) ---
    # In a real application, the retrieved chunks would be formatted into a prompt
    # and sent to a large language model.
    context_for_llm = "\n\n---\n\n".join([chunk.text for chunk in retrieved_chunks])
    prompt = f"""
    Based on the following context, please answer the user's question.
    Context:
    {context_for_llm}

    Question: {query.question}

    Answer:
    """
    # For this initial implementation, we will just return a mock answer.
    llm_answer = f"This is a mock answer based on {len(retrieved_chunks)} retrieved chunks. The most relevant chunk was about: '{retrieved_chunks[0].text[:100]}...'"
    print(f"Generated mock LLM answer.")
    
    return QueryResponse(
        retrieved_chunks=retrieved_chunks,
        llm_answer=llm_answer
    )

@app.get("/api/health")
async def health_check():
    """
    A simple health check endpoint to confirm the server is running.
    """
    return {"status": "ok"}

# To run this application:
# 1. Make sure you have installed the necessary packages:
#    pip install "fastapi[all]" "sentence-transformers" "chromadb"
# 2. Run from your terminal:
#    uvicorn src.chatbot.rag_chatbot:app --reload
