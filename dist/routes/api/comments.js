"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _CommentsController = _interopRequireDefault(require("../../controllers/CommentsController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.route('/update').put(_CommentsController.default.updateComment);
router.route('/delete').delete(_CommentsController.default.deleteComment);
router.route('/all/:blog_id').get(_CommentsController.default.getAllComments);
router.route('/add/:blog_id').post(_CommentsController.default.createNewComment);
router.route('/:id').get(_CommentsController.default.getComment);
var _default = router;
exports.default = _default;