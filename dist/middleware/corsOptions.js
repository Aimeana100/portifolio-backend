"use strict";

var _allowedOrigins = _interopRequireDefault(require("./allowedOrigins"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const corsOptions = {
  origin: (origin, callback) => {
    if (_allowedOrigins.default.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
module.exports = corsOptions;