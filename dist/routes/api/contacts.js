"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ContactsController = _interopRequireDefault(require("../../controllers/ContactsController"));
var _verifyJWT = _interopRequireDefault(require("../../middleware/verifyJWT"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.route('/all').get(_verifyJWT.default, _ContactsController.default.getAllContacts);
router.route('/add').post(_ContactsController.default.createNewContact);
router.route('/').put(_verifyJWT.default, _ContactsController.default.updateContact);
router.route('/delete').delete(_verifyJWT.default, _ContactsController.default.deleteContact);
router.route('/:id').get(_verifyJWT.default, _ContactsController.default.getContact);
var _default = router;
exports.default = _default;