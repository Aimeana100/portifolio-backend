"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const handleLogin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Username and password are required.'
    });
  }
  const foundUser = await _User.default.findOne({
    email
  }).exec();
  if (!foundUser) return res.status(401).json({
    message: "user not registered"
  }); // Unauthorized
  // evaluate password
  const match = await _bcrypt.default.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = _jsonwebtoken.default.sign({
      UserInfo: {
        email: foundUser.email,
        roles
      }
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m'
    });
    const refreshToken = _jsonwebtoken.default.sign({
      email: foundUser.email
    }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 60 * 1000
    });

    // Send authorization roles and access token to user
    return res.status(200).json({
      roles,
      accessToken,
      message: 'Loggin succesfull'
    });
  }
  return res.tatus(401).json({
    message: 'Login failed'
  });
};
var _default = {
  handleLogin
};
exports.default = _default;