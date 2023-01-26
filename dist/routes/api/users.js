"use strict";

var _express = _interopRequireDefault(require("express"));
var _verifyJWT = _interopRequireDefault(require("../../middleware/verifyJWT"));
var _usersController = _interopRequireDefault(require("../../controllers/usersController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line import/no-import-module-exports

const router = _express.default.Router();
router.route('/all').get(_verifyJWT.default, _usersController.default.getAllUsers);
router.route('/delete').delete(_verifyJWT.default, _usersController.default.deleteUser);
router.route('/:id').get(_verifyJWT.default, _usersController.default.getUser);
module.exports = router;