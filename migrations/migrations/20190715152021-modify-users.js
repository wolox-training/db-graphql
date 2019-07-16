'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(transaction =>
      queryInterface
        .renameColumn('users', 'firstName', 'first_name', { transaction })
        .then(() => queryInterface.renameColumn('users', 'lastName', 'last_name', { transaction }))
        .then(() => queryInterface.removeColumn('users', 'username', { transaction }))
        .then(() =>
          queryInterface.changeColumn(
            'users',
            'created_at',
            { type: Sequelize.DATE, allowNull: false },
            { transaction }
          )
        )
        .then(() =>
          queryInterface.changeColumn(
            'users',
            'updated_at',
            { type: Sequelize.DATE, allowNull: false },
            { transaction }
          )
        )
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(transaction =>
      queryInterface
        .renameColumn('users', 'first_name', 'firstName', { transaction })
        .then(() => queryInterface.renameColumn('users', 'last_name', 'lastName', { transaction }))
        .then(() =>
          queryInterface.addColumn(
            'users',
            'username',
            {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true
            },
            { transaction }
          )
        )
        .then(() =>
          queryInterface.changeColumn('users', 'created_at', { type: Sequelize.DATE }, { transaction })
        )
        .then(() =>
          queryInterface.changeColumn('users', 'updated_at', { type: Sequelize.DATE }, { transaction })
        )
    )
};
