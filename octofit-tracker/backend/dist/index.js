import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { apiPort, getApiBaseUrl } from './config/apiUrl.js';
import './config/database.js';
import { activitiesRouter } from './routes/activities.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamsRouter } from './routes/teams.js';
import { usersRouter } from './routes/users.js';
import { workoutsRouter } from './routes/workouts.js';
const app = express();
const port = apiPort;
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
});
app.listen(port, () => {
    console.log(`OctoFit backend listening at ${getApiBaseUrl()}`);
});
