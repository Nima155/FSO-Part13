'use strict'
const { DataTypes } = require('sequelize')

async function up({ context: queryInterface }) {
	/**
	 * Add altering commands here.
	 *
	 * Example:
	 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
	 */
	await queryInterface.addColumn('users', 'disabled', {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	})
}

async function down({ context: queryInterface }) {
	/**
	 * Add reverting commands here.
	 *
	 * Example:
	 * await queryInterface.dropTable('users');
	 */
	await queryInterface.removeColumn('users', 'disabled')
}

module.exports = { up, down }
