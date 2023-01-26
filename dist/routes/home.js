"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('^/$|/index(.html)?', (req, res) => {
  return res.status(200).json({
    "message": "this should route you homepage"
  });
});
module.exports = router;