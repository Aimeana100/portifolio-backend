"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _refreshTokenController = _interopRequireDefault(require("../controllers/refreshTokenController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/', _refreshTokenController.default.handleRefreshToken);
var _default = router;
exports.default = _default;