import { Request, Response } from 'express';
// import leaderboard from '../services/leaderboardService';
// import { leaderboard, leaderboardSequelize } from '../services/leaderboardService';
import { completeLeaderboard } from '../services/leaderboardService';

const getLeaderboard = async (_req: Request, res: Response) => {
  const allMatches = await completeLeaderboard();
  //   const test = await leaderboardSequelize();
  return res.status(200).json(allMatches);
};

export default getLeaderboard;
