# Use a lightweight Python image
FROM python:3.10-slim-buster

# Set working directory
WORKDIR /app/backend

# Copy backend dependencies
COPY ./docusaurus_app/backend/requirements.txt /app/backend/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code
COPY ./docusaurus_app/backend /app/backend
COPY ./docusaurus_app/src/cahtobot /app/src/cahtobot # Copy RAGChatbot dependency

# Expose the port FastAPI runs on
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]