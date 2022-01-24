'use strict'
const { DataTypes } = require('sequelize')
async function up({ context: queryInterface }) {
	queryInterface.addColumn('blogs', 'year', {
		type: DataTypes.INTEGER,
	})
}

async function down({ context: queryInterface }) {
	await queryInterface.removeColumn('blogs', 'year')
}

module.exports = { up, down }
