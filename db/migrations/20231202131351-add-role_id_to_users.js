'use strict'

export async function up (queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'roleId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Roles',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    defaultValue: null
  })
}

export async function down (queryInterface, Sequelize) {
  queryInterface.removeColumn('users', 'roleId')
}
