import { Request, Response } from 'express';
import { findAllMatchesService, inProgressMatchesService } from '../services/matchesService';

const findAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  console.log(inProgress);
  const isTrueInProgress = (inProgress === 'true');
  if (inProgress) {
    const inProgressMatches = await inProgressMatchesService(isTrueInProgress);
    return res.status(200).json(inProgressMatches);
  }
  const allMatches = await findAllMatchesService();
  return res.status(200).json(allMatches);
};

export default findAllMatches;
