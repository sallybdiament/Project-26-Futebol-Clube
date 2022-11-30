import { Request, Response } from 'express';
import { leaderboardOrdered,
  allMatches,
  homeMatches,
  awayMatches } from '../services/leaderboardService';

export const getLeaderboard = async (_req: Request, res: Response) => {
  const all = await leaderboardOrdered(allMatches);
  return res.status(200).json(all);
};

export const getLeaderboardHome = async (_req: Request, res: Response) => {
  const home = await leaderboardOrdered(homeMatches);
  return res.status(200).json(home);
};
export const getLeaderboardAway = async (_req: Request, res: Response) => {
  const away = await leaderboardOrdered(awayMatches);
  return res.status(200).json(away);
};
