const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
})

const migrationConf = {
	migrations: { glob: 'migrations/*.js' },
	context: sequelize.getQueryInterface(),
	storage: new SequelizeStorage({ sequelize }),
	logger: console,
}

const runMigrations = async () => {
	const umzug = new Umzug(migrationConf)

	;(async () => {
		// Checks migrations and run them if they are not already applied. To keep
		// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
		// will be automatically created (if it doesn't exist already) and parsed.
		await umzug.up()
	})()
}

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate()
		await runMigrations()
		await console.log('database connected')
	} catch (err) {
		console.log('connecting database failed')
		return process.exit(1)
	}

	return null
}

const rollBackMigration = async () => {
	await sequelize.authenticate()
	const migrator = new Umzug(migrationConf)
	await migrator.down()
}

module.exports = { sequelize, connectToDatabase, rollBackMigration }
