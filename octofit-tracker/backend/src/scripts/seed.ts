import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Cardio Crusaders',
        coach: 'Maya Patel',
        focus: 'Endurance and heart health',
        memberCount: 18,
        weeklyGoalMinutes: 900,
      },
      {
        name: 'Strength Squad',
        coach: 'Jordan Kim',
        focus: 'Progressive strength training',
        memberCount: 14,
        weeklyGoalMinutes: 720,
      },
      {
        name: 'Flex Force',
        coach: 'Elena Garcia',
        focus: 'Mobility and recovery',
        memberCount: 11,
        weeklyGoalMinutes: 540,
      },
    ]);

    const users = await User.insertMany([
      {
        name: 'Avery Johnson',
        email: 'avery.johnson@example.com',
        role: 'member',
        age: 29,
        fitnessGoal: 'Run a half marathon',
        team: teams[0].name,
      },
      {
        name: 'Sam Rivera',
        email: 'sam.rivera@example.com',
        role: 'member',
        age: 34,
        fitnessGoal: 'Build lean muscle',
        team: teams[1].name,
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        role: 'captain',
        age: 31,
        fitnessGoal: 'Improve mobility',
        team: teams[2].name,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@example.com',
        role: 'member',
        age: 26,
        fitnessGoal: 'Increase weekly activity',
        team: teams[0].name,
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0].name,
        type: 'Outdoor Run',
        durationMinutes: 48,
        caloriesBurned: 520,
        activityDate: new Date('2026-07-20T13:00:00Z'),
      },
      {
        user: users[1].name,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 430,
        activityDate: new Date('2026-07-21T22:30:00Z'),
      },
      {
        user: users[2].name,
        type: 'Yoga Flow',
        durationMinutes: 40,
        caloriesBurned: 180,
        activityDate: new Date('2026-07-22T12:15:00Z'),
      },
      {
        user: users[3].name,
        type: 'Cycling',
        durationMinutes: 62,
        caloriesBurned: 610,
        activityDate: new Date('2026-07-23T01:45:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        rank: 1,
        user: users[3].name,
        team: users[3].team,
        points: 1480,
        activeMinutes: 312,
      },
      {
        rank: 2,
        user: users[0].name,
        team: users[0].team,
        points: 1325,
        activeMinutes: 285,
      },
      {
        rank: 3,
        user: users[1].name,
        team: users[1].team,
        points: 1210,
        activeMinutes: 248,
      },
      {
        rank: 4,
        user: users[2].name,
        team: users[2].team,
        points: 980,
        activeMinutes: 205,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        level: 'Intermediate',
        durationMinutes: 45,
        targetMuscleGroups: ['legs', 'core'],
        recommendedForGoal: 'Run a half marathon',
      },
      {
        title: 'Full-Body Strength Circuit',
        level: 'Beginner',
        durationMinutes: 35,
        targetMuscleGroups: ['chest', 'back', 'legs'],
        recommendedForGoal: 'Build lean muscle',
      },
      {
        title: 'Morning Mobility Reset',
        level: 'Beginner',
        durationMinutes: 25,
        targetMuscleGroups: ['hips', 'shoulders', 'spine'],
        recommendedForGoal: 'Improve mobility',
      },
      {
        title: 'Low-Impact Cardio Mix',
        level: 'All levels',
        durationMinutes: 30,
        targetMuscleGroups: ['legs', 'core'],
        recommendedForGoal: 'Increase weekly activity',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
