import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

// Dynamic API URL for GitHub Codespaces vs Localhost
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

console.log(`API Base URL configured at: ${apiBaseUrl}`);

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Octocat' },
    { id: 2, name: 'Mona' }
  ]);
});

app.get('/api/activities', (req, res) => {
  res.json([
    { id: 1, activity: 'Running', duration: 30 },
    { id: 2, activity: 'Cycling', duration: 45 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});