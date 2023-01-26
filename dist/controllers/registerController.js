"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _User = _interopRequireDefault(require("../models/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line consistent-return
const handleNewUser = async (req, res) => {
  const {
    names,
    email,
    password
  } = req.body;
  if (!names || !password || !email) return res.status(400).json({
    message: 'names, email and password are required.'
  });

  // check for duplicate usernames in the db
  const duplicate = await _User.default.findOne({
    email
  }).exec();
  if (duplicate) return res.status(409).json({
    message: `User with email ${email} already exist`
  }); // Conflict

  try {
    // encrypt the password
    const hashedPwd = await _bcrypt.default.hash(password, 10);
    // create and store the new user
    const result = await _User.default.create({
      names,
      email,
      password: hashedPwd,
      role: 'user'
    });
    res.status(201).json({
      success: `New user with email ${email} created!`
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
var _default = {
  handleNewUser
};
exports.default = _default;