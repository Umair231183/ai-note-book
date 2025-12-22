# Deployment Guide: Frontend + Backend

## Important Note
GitHub Pages can only host static frontend content. It cannot run Python FastAPI applications. You need to deploy the frontend and backend separately.

## Deployment Steps

### 1. Deploy the Backend (FastAPI)

The backend needs to be deployed to a platform that supports Python applications:

#### Option A: Heroku
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new app in Heroku dashboard
4. Connect your GitHub repository to Heroku
5. Deploy the backend with the following structure:
```
backend/
├── main.py
├── requirements.txt
├── Procfile
└── other backend files...
```

#### Option B: Railway
1. Create a Railway account
2. Connect your GitHub repository
3. Create a new project
4. Deploy the backend service

#### Option C: Render
1. Create a Render account
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the build and start commands

### 2. Deploy the Frontend (Docusaurus)

The frontend can be deployed to GitHub Pages:

1. Fork this repository
2. Create a new branch for deployment
3. Update the `FASTAPI_BASE_URL` in the GitHub repository secrets to point to your deployed backend URL
4. In your forked repository, go to Settings > Pages
5. Set the source to your branch
6. Push changes to trigger GitHub Actions deployment

### GitHub Actions Workflow

The workflow file `.github/workflows/deploy.yml` is already configured to:
1. Build the Docusaurus site
2. Deploy it to GitHub Pages
3. Use the `FASTAPI_BASE_URL` from GitHub Secrets

### Environment Variables

You need to set the following in GitHub Secrets:
- `FASTAPI_BASE_URL`: The URL of your deployed backend (e.g., `https://your-app-name.herokuapp.com`)

### Configuration

Make sure your `docusaurus.config.js` is configured with:
- `url`: Your GitHub Pages URL (e.g., `https://your-username.github.io`)
- `baseUrl`: Your repository name (e.g., `/your-repo-name/`)

### CORS Configuration

Ensure your backend allows CORS requests from your GitHub Pages URL:

```python
from fastapi.middleware.cors import CORSMiddleware


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-username.github.io"],  # GitHub Pages URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Testing

After deployment:
1. Visit your GitHub Pages URL to see the frontend
2. Make sure the chatbot functionality works
3. Check that API calls are being made to your backend
4. Verify that questions and responses work properly

### Troubleshooting

If the frontend doesn't work after deployment:
1. Check browser console for errors
2. Verify that `FASTAPI_BASE_URL` is correctly set
3. Ensure CORS is configured on the backend
4. Confirm the backend API endpoints are accessible

### Example URLs
- Frontend: `https://your-username.github.io/ai-notebook-frontend/`
- Backend API: `https://your-backend-app.herokuapp.com/api/query`