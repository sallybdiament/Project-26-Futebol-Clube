import { Request, Response } from 'express';
import { validateBody, validateLogin } from '../services/AuthService';

// class AuthController {
//   private service: AuthService;

// constructor() {
//   // this.service = new AuthService();
//   this.login();
// }

//   public auth(req: Request<{}, {}, ILogin>, res: Response) {
//     const token = this.validateLogin(req.body);
//     res.status(200).json(token);
//   }
// }

const login = async (req: Request, res: Response) => {
  const userInfo = req.body;
  const auth = validateBody(userInfo);
  if (auth.type === 400) {
    return res.status(auth.type).json({
      message: 'All fields must be filled',
    });
  }
  const result = await validateLogin(req.body);
  if (result?.type === 401) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  console.log(result);
  return res.status(200).json({ token: result.type });
};
// }

export default login;
// export default AuthController;
