import { Request, Response } from 'express';
import { validateBody, validateLogin } from '../services/AuthService';

const AuthController = async (req: Request, res: Response) => {
  const auth = validateBody(req.body);
  if (auth.type === 400) {
    return res.status(auth.type).json({
      message: 'Some required fields are missing',
    });
  }
  const { email, password } = req.body;
  const result = await validateLogin({ email, password });
  if (result.type) {
    return res.status(400).json({
      message: 'Invalid fields',
    });
  }
  const { token } = result;
  return res.status(200).json({ token });
};

export default AuthController;
