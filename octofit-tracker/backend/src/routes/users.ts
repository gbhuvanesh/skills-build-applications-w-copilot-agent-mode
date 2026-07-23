import { Router } from 'express';
import { User } from '../models/User.js';

export const usersRouter = Router();

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
});