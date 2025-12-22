from qdrant_client import QdrantClient
from qdrant_client.http import models
from typing import List, Dict, Any
import os
from dotenv import load_dotenv
import uuid

# Load environment variables
load_dotenv()

class VectorStoreService:
    """
    Service for interacting with the Qdrant vector store.
    """

    def __init__(self):
        """
        Initialize the Qdrant client and set up the collection.
        """
        self.qdrant_url = os.getenv("QDRANT_URL")
        self.qdrant_api_key = os.getenv("QDRANT_API_KEY")

        try:
            if self.qdrant_url:
                if self.qdrant_api_key:
                    self.client = QdrantClient(url=self.qdrant_url, api_key=self.qdrant_api_key)
                else:
                    self.client = QdrantClient(url=self.qdrant_url)
            else:
                # For local development, use local Qdrant server instead of in-memory
                # In-memory has compatibility issues with langchain-qdrant
                print("Using local gRPC-based in-memory storage instead of HTTP in-memory")
                self.client = QdrantClient(location=":memory:", prefer_grpc=True)
        except Exception as e:
            print(f"Warning: Could not connect to Qdrant: {e}")
            # Fallback to gRPC-based in-memory storage
            self.client = QdrantClient(location=":memory:", prefer_grpc=True)

        self.collection_name = "textbook_chapters"
        self._initialize_collection()

    def _initialize_collection(self):
        """
        Initialize the Qdrant collection for storing textbook content.
        """
        try:
            # Check if collection exists
            self.client.get_collection(self.collection_name)
        except:
            # Create collection if it doesn't exist
            # Using a dimension size appropriate for OpenAI embeddings (1536 for text-embedding-ada-002)
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=models.VectorParams(size=1536, distance=models.Distance.COSINE)
            )

    def add_document(self, doc_id: str, content: str, metadata: Dict[str, Any] = None):
        """
        Add a document to the vector store.

        Args:
            doc_id: Unique identifier for the document
            content: Text content of the document
            metadata: Additional metadata about the document
        """
        if metadata is None:
            metadata = {}

        # Determine embedding dimensions (default to OpenAI's 1536 if not set)
        dimensions = getattr(self, 'embedding_dimensions', 1536)

        # Add the document to the collection
        # Note: In a real implementation, we would generate embeddings here
        # For now, we'll store the content with a placeholder embedding
        try:
            # Generate a random vector for this example with correct dimensions
            import numpy as np
            vector = [float(x) for x in np.random.random(dimensions)]

            # Create a unique ID for the document
            point_id = abs(hash(f"{doc_id}_{content[:50]}")) % (10**10)  # Ensure a reasonable integer ID

            self.client.upsert(
                collection_name=self.collection_name,
                points=[
                    models.PointStruct(
                        id=point_id,
                        vector=vector,
                        payload={
                            "content": content,
                            "doc_id": doc_id,
                            **metadata
                        }
                    )
                ]
            )
            print(f"Document {doc_id} added successfully to vector store")
        except Exception as e:
            print(f"Error adding document to vector store: {e}")
            # Still try to add even if there's an error with ID generation
            try:
                self.client.upsert(
                    collection_name=self.collection_name,
                    points=[
                        models.PointStruct(
                            id=uuid.uuid4().int & (1<<64)-1,  # 64-bit integer ID
                            vector=[float(x) for x in np.random.random(dimensions)],
                            payload={
                                "content": content,
                                "doc_id": doc_id,
                                **metadata
                            }
                        )
                    ]
                )
                print(f"Document {doc_id} added with fallback ID")
            except Exception as fallback_e:
                print(f"Fallback also failed: {fallback_e}")

    def search_documents(self, query_vector: List[float], limit: int = 5) -> List[Dict[str, Any]]:
        """
        Search for documents similar to the query vector.

        Args:
            query_vector: Vector representation of the query
            limit: Maximum number of results to return

        Returns:
            List of documents with their metadata
        """
        try:
            from qdrant_client.http import models
            search_results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=limit
            )

            results = []
            for hit in search_results:
                results.append({
                    "content": hit.payload.get("content", ""),
                    "doc_id": hit.payload.get("doc_id", ""),
                    "score": hit.score,
                    **hit.payload
                })

            return results
        except Exception as e:
            print(f"Error searching documents: {e}")
            return []

    def retrieve_content(self, query: str) -> List[Dict[str, Any]]:
        """
        Retrieve content relevant to the query.

        Args:
            query: User's query string

        Returns:
            List of relevant content chunks with metadata
        """
        # This would involve:
        # 1. Converting the query string to an embedding using OpenAI
        # 2. Searching the vector store
        # 3. Returning the most relevant content
        # For now, returning empty list
        return []

    def update_embedding_dimensions(self, dimensions: int):
        """
        Update the collection to use the correct embedding dimensions.

        Args:
            dimensions: The dimension size for the embeddings (e.g., 1024 for Cohere, 1536 for OpenAI)
        """
        # Note: In a real implementation, you would recreate the collection with new dimensions
        # For this implementation, we'll just store the dimension size
        self.embedding_dimensions = dimensions
        # For now, we'll just update the internal reference
        # In a real implementation, you'd need to recreate the collection