"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _BlogsController = _interopRequireDefault(require("../../controllers/BlogsController"));
var _verifyJWT = _interopRequireDefault(require("../../middleware/verifyJWT"));
var _verifyRoles = _interopRequireDefault(require("../../middleware/verifyRoles"));
var _roles_list = _interopRequireDefault(require("../../config/roles_list"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.route('/all').get(_BlogsController.default.getAllBlogs);
router.route('/add').post(_verifyJWT.default, _BlogsController.default.createNewBlog);
router.route('/update').put(_verifyJWT.default, _BlogsController.default.updateBlog);
router.route('/delete').delete(_verifyJWT.default, _BlogsController.default.deleteBlog);
router.route('/:id').get(_BlogsController.default.getBlog);
var _default = router;
exports.default = _default;