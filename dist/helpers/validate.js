"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  ObjectId
} = _mongoose.default.Types;
const validateObjectId = id => {
  return ObjectId.isValid(id);
};
var _default = {
  validateObjectId
};
exports.default = _default;