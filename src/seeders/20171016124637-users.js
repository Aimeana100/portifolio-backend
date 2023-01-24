/* eslint-disable */
import  bcrypt from 'bcrypt';
export default {
  /**
   *
   *
   * @param {any} queryInterface
   * @param {any} Sequelize
   * @returns
   */
  
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      names : 'admin',
      email: 'aimeanathole1234@gmail.com',
      password : bcrypt.hash('1234', 10),
      role: 'user',
      created_at : new Date(),
    }], {});
  },

  /**
   *
   *
   * @param {any} queryInterface
   * @param {any} Sequelize
   */
  down: function(queryInterface, Sequelize) {
    queryInterface.bulkDelete('users', [{
      email :'aimeanathole1234@gmail.com',
    }])
  }
};

/* eslint-enable */
