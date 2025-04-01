const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: email },
        { username: username }
      ]
    }});
  console.log(user);
  if (user) return res.status(201).json({ message: 'User already exists' });
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(400).json({ message: 'System Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key');
  res.status(200).json({ message: 'Logged in', token });
};
