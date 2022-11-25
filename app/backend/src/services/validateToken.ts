import jwt = require('jsonwebtoken');
// import Users from '../database/models/Users';

require('dotenv/config');

const secret = process.env.JWT_SECRET || '';

const validateToken = async (token: string) => {
//   if (!token) {
//     const e = new Error('Token obrigatório!');
//     e.name = 'Token obrigatório';
//     throw e;
//   }
  const decoded = jwt.verify(token, secret) || '';
  return decoded;
};

export default validateToken;
