'use strict'
const { DataTypes } = require('sequelize')
async function up({ context: queryInterface }) {
	await queryInterface.createTable('users', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	})

	await queryInterface.createTable('blogs', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		author: {
			type: DataTypes.TEXT,
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		likes: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},

		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	})
	queryInterface.addColumn('blogs', 'user_id', {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: { key: 'id', model: 'users' },
	})
}

async function down({ context: queryInterface }) {
	await queryInterface.dropTable('users')
	await queryInterface.dropTable('blogs')
}

module.exports = { up, down }
