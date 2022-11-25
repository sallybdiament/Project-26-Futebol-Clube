import { Request, Response } from 'express';
import { findAllTeamsService, findTeamByIdService } from '../services/teamService';

export const findAllTeams = async (_req: Request, res: Response) => {
  const allTeams = await findAllTeamsService();
  return res.status(200).json(allTeams);
};

export const findOneTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await findTeamByIdService(Number(id));
  res.status(200).json(team);
};
