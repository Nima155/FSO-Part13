require('dotenv').config()

module.exports = {
	PORT: process.env.PORT || 3001,
	DATABASE_URL: process.env.DATABASE_URL,
	SECRET: process.env.SECRET,
	SECRET_V2: process.env.SECRET_V2,
}
