"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line consistent-return
const handleRefreshToken = async (req, res) => {
  const {
    cookies
  } = req;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await _User.default.findOne({
    refreshToken
  }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  _jsonwebtoken.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
  // eslint-disable-next-line consistent-return
  (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = _jsonwebtoken.default.sign({
      UserInfo: {
        username: decoded.username,
        roles
      }
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10s'
    });
    res.json({
      roles,
      accessToken
    });
  });
};
var _default = {
  handleRefreshToken
};
exports.default = _default;