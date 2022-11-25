import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import validateToken from '../services/validateToken';

const validateRole = async (req: Request, res: Response) => {
  const token = req.header('Authorization') || '';
  const user = await validateToken(token) as JwtPayload;
  const { role } = user.data;
  return res.status(200).json({ role });
};

export default validateRole;
