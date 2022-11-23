import Joi = require('joi');
import bcrypt = require ('bcryptjs');
import jwt = require('jsonwebtoken');
import IUser from '../entities/IUser';
import Users from '../database/models/Users';

export const validateBody = (params: IUser) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = userSchema.validate(params);
  if (error) return { type: 400, message: 'All fields must be filled' };
  return { type: 200 };
};
export const createToken = (data: IUser) => {
  const token = jwt.sign({ data }, 'jwt_secret', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

export const validateLogin = async (userBody: IUser) => {
  // SELECT * FROM USERS WHERE EMAIL = XXXXX
  const { email, password } = userBody;
  const user = await Users.findOne({
    attributes: ['id', 'email', 'password'],
    where: { email } });
  if (!user) {
    return { type: 401, message: 'Incorrect email or password' };
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      return { type: 401, message: 'Incorrect email or password' };
    }
    const { password: _, ...userWithoutPassword } = user.dataValues;
    const token = createToken(userWithoutPassword);
    return { token };
  });
};
