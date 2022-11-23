import Joi = require('joi');
import bcrypt = require ('bcryptjs');
import jwt = require('jsonwebtoken');
import ILogin from '../entities/ILogin';
import IUser from '../entities/IUser';
import Users from '../database/models/Users';
import 'dotenv/config';

export const validateBody = (params: IUser) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = userSchema.validate(params);
  if (error) return { type: 400, message: 'All fields must be filled' };
  return { type: 200 };
};

const secret = process.env.JWT_SECRET || '';

const createToken = (data: IUser) => {
  const token = jwt.sign({ data }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

export const validateLogin = async (userBody: ILogin) => {
  const { email, password } = userBody;
  const user = await Users.findOne({
    attributes: ['id', 'email', 'role', 'username'],
    where: { email } });
  if (!user) {
    return { type: 401, message: 'Incorrect email or password' };
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      return { type: 401, message: 'Incorrect email or password' };
    }
    const token = createToken(user.dataValues());
    return { type: 200, message: token };
  });
};
