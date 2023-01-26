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
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: Object,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: false
  },
  status: {
    type: String,
    default: 'unmuted'
  }
});
var _default = _mongoose.default.model('Blog', BlogSchema);
exports.default = _default;