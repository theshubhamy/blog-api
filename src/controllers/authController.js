import  {User}   from '../models/config.js';
import bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';

export const register = async (req, res,next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const isExistingUser = await User.findOne({ where: { email } });
    if(!isExistingUser){
      const user = await User.create({ username, password: hashedPassword });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
      res.status(201).json({ user, token });
    }else{
      const error = new Error("User already exist!");
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const login = async (req, res,next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);

    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ user, token });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

