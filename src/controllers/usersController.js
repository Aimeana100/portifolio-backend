/* eslint-disable consistent-return */
import User from '../models/User';

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({ message: 'No users found.' });
  }
  res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  if (!req.body.id) return res.status(404).json({ message: 'User ID is required.' });
  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res.status(404).json({ message: `User with id : ${req.body.id} does not exist` });
  }
  const result = await User.deleteOne({ _id: req.body.id }).exec();

  res.status(200).json(result);
};

const getUser = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: 'User Id is required.' });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(404).json({ message: `User with id : ${req.params.id} does not exist` });
  }
  res.status(200).json(user);
};

export default {
  getAllUsers,
  deleteUser,
  getUser,
};
