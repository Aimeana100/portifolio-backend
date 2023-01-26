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
const CommentSchema = new Schema({
  names: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comment_date: {
    type: Date,
    required: true,
    default: new Date()
  },
  status: {
    type: String,
    default: 'muted'
  }
});
var _default = _mongoose.default.model('Comment', CommentSchema);
exports.default = _default;