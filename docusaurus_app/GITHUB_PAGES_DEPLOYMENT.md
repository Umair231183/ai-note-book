# AI NoteBook Frontend

This is the frontend for the AI NoteBook application, built with Docusaurus.

## Deployment to GitHub Pages

This project is configured to be deployed to GitHub Pages. Here's how:

### Prerequisites

1. The backend API needs to be deployed separately (e.g., on Heroku, Railway, or Render)
2. You need to set the `FASTAPI_BASE_URL` environment variable in GitHub Secrets

### Setup

1. Fork this repository
2. In your forked repository, go to Settings > Pages
3. Set the source to "GitHub Actions"

### GitHub Secrets

You need to add the following secret to your GitHub repository:

- `FASTAPI_BASE_URL`: The URL of your deployed backend API (e.g., `https://your-backend-app.herokuapp.com`)

### Deployment Process

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. The site will be available at `https://[your-username].github.io/ai-notebook-frontend/`

### Local Development

```bash
npm install
npm start
```

### Building for Production

```bash
npm run build
```

## Architecture

- Frontend: Docusaurus (React-based static site generator)
- Backend: FastAPI (needs to be deployed separately)
- The frontend makes API calls to the backend for:
  - Query endpoint: `/api/query`
  - Ask-selected endpoint: `/api/ask-selected`
  - Ingest-content endpoint: `/api/ingest-content`
  - Health check endpoint: `/api/health`

## Environment Variables

- `FASTAPI_BASE_URL`: The base URL for the backend API (defaults to empty string)

## Troubleshooting

If the chatbot is not working after deployment:
1. Check that your backend API is deployed and accessible
2. Verify that the `FASTAPI_BASE_URL` is correctly set in GitHub Secrets
3. Ensure that your backend API allows CORS requests from your GitHub Pages URL