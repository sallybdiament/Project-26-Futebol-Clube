import { Request, Response } from 'express';
import findAllMatchesService from '../services/matchesService';

const findAllMatches = async (_req: Request, res: Response) => {
  const allMatches = await findAllMatchesService();
  return res.status(200).json(allMatches);
};

export default findAllMatches;
