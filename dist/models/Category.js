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
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "unmuted"
  }
});
var _default = _mongoose.default.model('Category', categorySchema);
exports.default = _default;