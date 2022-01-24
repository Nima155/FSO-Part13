const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Blog extends Model {}

Blog.init(
	{
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
		year: {
			type: DataTypes.INTEGER,
			validate: {
				isCorrectDate(value) {
					const currentYear = new Date().getFullYear()
					if (value && !(value >= 1991 && value <= currentYear)) {
						throw new Error(
							`date must be above or equal to 1991 and below or equal to ${currentYear}`
						)
					}
				},
			},
		},
	},
	{
		sequelize,
		underscored: true,
		modelName: 'blog',
	}
)

module.exports = Blog
