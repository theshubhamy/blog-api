import  {User}   from '../models/config.js';
import bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

