// Funcional:

// import { Request, Response } from 'express';
// import { findAllTeamsService, findTeamByIdService } from '../services/TeamService';

// export const findAllTeams = async (_req: Request, res: Response) => {
//   const allTeams = await findAllTeamsService();
//   return res.status(200).json(allTeams);
// };

// export const findOneTeam = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const team = await findTeamByIdService(Number(id));
//   res.status(200).json(team);
// };

// Com classe:

import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  static findAllTeams = async (_req: Request, res: Response) => {
    const allTeams = await TeamService.findAllTeams();
    return res.status(200).json(allTeams);
  };

  static findOneTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await TeamService.findTeamById(Number(id));
    res.status(200).json(team);
  };
}
