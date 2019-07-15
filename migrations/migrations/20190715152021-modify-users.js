'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.renameColumn('users', 'firstName', 'first_name'),
      queryInterface.renameColumn('users', 'lastName', 'last_name'),
      queryInterface.removeColumn('users', 'username'),
      queryInterface.changeColumn('users', 'created_at', { type: Sequelize.DATE, allowNull: false }),
      queryInterface.changeColumn('users', 'updated_at', { type: Sequelize.DATE, allowNull: false })
    ]),
  down: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.renameColumn('users', 'first_name', 'firstName'),
      queryInterface.renameColumn('users', 'last_name', 'lastName'),
      queryInterface.addColumn('users', 'username', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }),
      queryInterface.changeColumn('users', 'created_at', { type: Sequelize.DATE }),
      queryInterface.changeColumn('users', 'updated_at', { type: Sequelize.DATE })
    ])
};
