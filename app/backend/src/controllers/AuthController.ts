import { Request, Response } from 'express';
import { validateBody, validateLogin } from '../services/AuthService';
// class AuthController {
//   private service: AuthService;

//   constructor() {
//     this.service = new AuthService();
//   }

//   public auth(req: Request<{}, {}, ILogin>, res: Response) {
//     const token = this.validateLogin(req.body);
//     res.status(200).json(token);
//   }
// }

const AuthController = async (req: Request, res: Response) => {
  const auth = validateBody(req.body);
  if (auth.type === 400) {
    return res.status(auth.type).json({
      message: 'Some required fields are missing',
    });
  }
  const result = await validateLogin(req.body);
  if (result?.type === 200) { return res.status(200).json({ token: result }); }
  return res.status(401).json({ message: 'Incorrect email or password' });
};

export default AuthController;
