import jwt = require('jsonwebtoken');
// import Users from '../database/models/Users';

require('dotenv/config');

const secret = process.env.JWT_SECRET || '';

// interface decoded {
//   data: {
//     userId: number;
//   },
//   iat: number;
//   exp: number;
// }

const validateToken = async (token: string) => {
//   if (!token) {
//     const e = new Error('Token obrigatório!');
//     e.name = 'Token obrigatório';
//     throw e;
//   }

  const decoded = jwt.verify(token, secret) || '';
  console.log(decoded);
  //   const user = await Users.findByPk(decoded.data.userId);
  return decoded;
};

export default validateToken;
