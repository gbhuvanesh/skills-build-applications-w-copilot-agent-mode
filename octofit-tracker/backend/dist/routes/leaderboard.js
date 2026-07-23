import { Router } from 'express';
import { LeaderboardEntry } from '../models/Leaderboard.js';
export const leaderboardRouter = Router();
leaderboardRouter.get('/', async (_req, res, next) => {
    try {
        const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
        res.status(200).json({ leaderboard });
    }
    catch (error) {
        next(error);
    }
});
