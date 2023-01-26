"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _CategoriesController = _interopRequireDefault(require("../../controllers/CategoriesController"));
var _verifyJWT = _interopRequireDefault(require("../../middleware/verifyJWT"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.route('/all').get(_CategoriesController.default.getAllCategories);
router.route('/add').post(_verifyJWT.default, _CategoriesController.default.createNewCategory);
router.route('/update').put(_verifyJWT.default, _CategoriesController.default.updateCategory);
router.route('/delete').delete(_verifyJWT.default, _CategoriesController.default.deleteCategory);
router.route('/:id').get(_CategoriesController.default.getCategory);
var _default = router;
exports.default = _default;