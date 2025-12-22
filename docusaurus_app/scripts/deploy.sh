#!/bin/bash
# Deployment script for GitHub Pages

# This script is for local testing only. 
# For actual deployment, use GitHub Actions.

set -e

echo "Building the Docusaurus site..."

# Build the site
npm run build

echo "Build completed successfully!"

echo "To deploy to GitHub Pages:"
echo "1. Ensure your backend API is deployed and accessible"
echo "2. Set the FASTAPI_BASE_URL in GitHub Secrets"
echo "3. Push your changes to the main branch"
echo "4. GitHub Actions will automatically deploy to GitHub Pages"

echo "Your site will be available at: https://[your-username].github.io/ai-notebook-frontend/"