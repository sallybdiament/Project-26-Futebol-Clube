import { Request, Response } from 'express';
import validateToken from '../services/validateToken';

const validateRole = async (req: Request, res: Response) => {
  const token = req.header('Authorization') || '';
  console.log(token);
  const user = validateToken(token);
  return res.status(200).json({ role: user });
};

export default validateRole;
