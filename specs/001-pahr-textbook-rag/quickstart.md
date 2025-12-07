# Quickstart Guide: Qdrant Cloud Setup

This guide provides instructions for setting up Qdrant Cloud for production use.

## 1. Sign Up and Create a Cluster

1.  Go to the [Qdrant Cloud website](https://cloud.qdrant.io/) and sign up for an account.
2.  Follow the instructions to create a new cluster. Choose a suitable region.
3.  Once the cluster is provisioned, navigate to your cluster details.

## 2. Obtain Cluster URL and API Key

1.  From your cluster details page, locate your **Cluster URL**. It should look something like `https://[your-cluster-id].qdrant.tech`.
2.  Generate or retrieve your **API Key**. This will be used to authenticate your backend application with Qdrant.

## 3. Configure Environment Variables

Add the obtained Cluster URL and API Key to your production environment variables (e.g., in `docusaurus_app/.env.production` or your deployment platform's secrets management):

```bash
QDRANT_URL="https://[your-cluster-id].qdrant.tech"
QDRANT_API_KEY="YOUR_API_KEY_HERE"
QDRANT_COLLECTION_NAME="textbook_chapters_prod" # As defined in your backend
```

## 4. Collection Configuration

Ensure your Qdrant collection is configured correctly. The backend application will attempt to create the `textbook_chapters_prod` collection with `vectors_config=models.VectorParams(size=1536, distance=models.Distance.COSINE)` if it doesn't exist. You can also pre-configure this manually via the Qdrant Cloud UI if preferred.

---

# Quickstart Guide: Neon Serverless Postgres Setup

This guide provides instructions for setting up Neon Serverless Postgres for production use.

## 1. Create a Neon Project

1.  Go to the [Neon website](https://neon.tech/) and sign up or log in.
2.  Create a new project. Neon provides a serverless PostgreSQL database.
3.  Choose a database name and region.

## 2. Obtain Connection String

1.  Once your project is created, navigate to the "Connection Details" for your database.
2.  Copy the **Connection String (URI)**. It will look like `postgresql://user:password@host/dbname?sslmode=require`.

## 3. Configure Environment Variables

Add the obtained Connection String to your production environment variables (e.g., in `docusaurus_app/.env.production` or your deployment platform's secrets management):

```bash
NEON_DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

## 4. Database Schema

Your backend application expects tables for `users`, `user_preferences`, `chat_sessions`, and `chat_messages`. You will need to apply migrations or manually create these tables based on your `data-model.md` and Pydantic models. A more detailed migration guide would be part of the backend setup.