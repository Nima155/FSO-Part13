'use strict'

const { DataTypes } = require('sequelize')

async function up({ context: queryInterface }) {
	/**
	 * Add altering commands here.
	 *
	 * Example:
	 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
	 */
	await queryInterface.createTable('reading_lists', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},

		read: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { key: 'id', model: 'users' },
		},
		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { key: 'id', model: 'blogs' },
		},
	})
}

async function down({ context: queryInterface }) {
	/**
	 * Add reverting commands here.
	 *
	 * Example:
	 * await queryInterface.dropTable('users');
	 */
	await queryInterface.dropTable('reading_lists')
}
module.exports = { up, down }
