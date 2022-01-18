require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
})

const main = async () => {
	try {
		const notes = await sequelize.query('SELECT * from blogs', {
			type: QueryTypes.SELECT,
		})
		console.log(notes)
		sequelize.close()
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}

main()
