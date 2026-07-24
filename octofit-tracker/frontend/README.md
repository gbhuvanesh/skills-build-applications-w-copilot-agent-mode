# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` when running the frontend in GitHub Codespaces so the app can call the backend through the forwarded port URL:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, create `octofit-tracker/frontend/.env.local` with that value. When `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to `http://localhost:8000/api` instead of generating `https://undefined-8000.app.github.dev` URLs.

The Codespaces API endpoint format is:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```
