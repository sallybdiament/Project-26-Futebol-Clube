import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
// import IMatch from '../entities/IMatch';
import {
  findAllMatchesService,
  inProgressMatchesService,
  createNewMatchService,
  patchService,
  updateGoalsService } from '../services/matchesService';
import validateToken from '../services/validateToken';

export const findAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const isTrueInProgress = (inProgress === 'true');
  if (inProgress) {
    const inProgressMatches = await inProgressMatchesService(isTrueInProgress);
    return res.status(200).json(inProgressMatches);
  }
  const allMatches = await findAllMatchesService();
  return res.status(200).json(allMatches);
};

export const createMatch = async (req: Request, res: Response) => {
  const token = req.header('Authorization') || '';
  const user = await validateToken(token) as JwtPayload;
  if (!user) { return res.status(401).json({ message: 'Token must be a valid token' }); }

  const newTeam = req.body;
  const insertedNewMatch = await createNewMatchService(newTeam);
  return res.status(insertedNewMatch.type).json(insertedNewMatch.message);
};

export const endMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await patchService(Number(id));
  return res.status(200).json({ message: 'Finished' });
};

export const updateGoals = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await updateGoalsService(Number(id), homeTeamGoals, awayTeamGoals);
  return res.status(200).json('Succefully updated');
};
