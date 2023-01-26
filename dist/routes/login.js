"use strict";

var _express = _interopRequireDefault(require("express"));
var _authController = _interopRequireDefault(require("../controllers/authController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/', _authController.default.handleLogin);
module.exports = router;