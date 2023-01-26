"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable */
var _default = {
  /**
   *
   *
   * @param {any} queryInterface
   * @param {any} Sequelize
   * @returns
   */

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      names: 'admin',
      email: 'aimeanathole1234@gmail.com',
      password: _bcrypt.default.hash('1234', 10),
      role: 'user',
      created_at: new Date()
    }], {});
  },
  /**
   *
   *
   * @param {any} queryInterface
   * @param {any} Sequelize
   */
  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('users', [{
      email: 'aimeanathole1234@gmail.com'
    }]);
  }
};
/* eslint-enable */
exports.default = _default;