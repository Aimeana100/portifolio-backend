"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _User = _interopRequireDefault(require("../models/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable consistent-return */

const getAllUsers = async (req, res) => {
  const users = await _User.default.find();
  if (!users) {
    return res.status(404).json({
      message: 'No users found.'
    });
  }
  res.status(200).json(users);
};
const deleteUser = async (req, res) => {
  if (!req.body.id) return res.status(404).json({
    message: 'User ID is required.'
  });
  const user = await _User.default.findOne({
    _id: req.body.id
  }).exec();
  if (!user) {
    return res.status(404).json({
      message: `User with id : ${req.body.id} does not exist`
    });
  }
  const result = await _User.default.deleteOne({
    _id: req.body.id
  }).exec();
  res.status(200).json(result);
};
const getUser = async (req, res) => {
  if (!req.params.id) return res.status(400).json({
    message: 'User Id is required.'
  });
  const user = await _User.default.findOne({
    _id: req.params.id
  }).exec();
  if (!user) {
    return res.status(404).json({
      message: `User with id : ${req.params.id} does not exist`
    });
  }
  res.status(200).json(user);
};
var _default = {
  getAllUsers,
  deleteUser,
  getUser
};
exports.default = _default;