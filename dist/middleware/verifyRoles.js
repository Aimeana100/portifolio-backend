"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// eslint-disable-next-line consistent-return
const verifyRoles = (...allowedRoles) => (req, res, next) => {
  if (!req?.roles) return res.sendStatus(401);
  const rolesArray = [...allowedRoles];
  const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
  if (!result) return res.sendStatus(401);
  next();
};
var _default = verifyRoles;
exports.default = _default;