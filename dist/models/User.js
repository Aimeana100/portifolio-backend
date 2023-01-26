"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const userSchema = new Schema({
  names: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String
});
var _default = _mongoose.default.model('User', userSchema);
exports.default = _default;