"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization || req.headers.token;
  console.log(authHeader);
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({
    message: 'No token provided.'
  });
  const token = authHeader.split(' ')[1];
  _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET,
  // eslint-disable-next-line consistent-return
  (err, decoded) => {
    if (err) return res.status(403).json({
      message: res.message
    }); // invalid token
    req.email = decoded.UserInfo.email;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};
var _default = verifyJWT;
exports.default = _default;