"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _logoutController = _interopRequireDefault(require("../controllers/logoutController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/', _logoutController.default.handleLogout);
var _default = router;
exports.default = _default;