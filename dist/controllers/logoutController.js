"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _User = _interopRequireDefault(require("../models/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const {
    cookies
  } = req;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await _User.default.findOne({
    refreshToken
  }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = '';
  await foundUser.save();
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  });
  return res.sendStatus(204);
};
var _default = {
  handleLogout
};
exports.default = _default;