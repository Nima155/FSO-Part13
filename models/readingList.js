const { sequelize } = require('../utils/db')
const { DataTypes, Model } = require('sequelize')

class ReadingList extends Model {}

ReadingList.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		read: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { key: 'id', model: 'users' },
		},

		blogId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { key: 'id', model: 'blogs' },
		},
	},
	{
		timestamps: false,
		sequelize,
		underscored: true,
		modelName: 'reading_list',
	}
)

module.exports = ReadingList
