require('dotenv').config()
const { sequelize } = require('./utils/db')
const express = require('express')
const { PORT, SECRET_V2 } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const authorRouter = require('./controllers/authors')
const session = require('express-session')
const readingListRouter = require('./controllers/readingLists')
const apiErrorHandler = require('./error/apiErrorHandler')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const myStore = new SequelizeStore({
	db: sequelize,
})
// initalize sequelize with session store
app.use(express.json())
app.use(
	session({
		secret: SECRET_V2,
		store: myStore,
		resave: false,

		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
		},
	})
)
myStore.sync()
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(apiErrorHandler)

const start = async () => {
	await connectToDatabase()
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

start()

// const main = async () => {
// 	try {
// 		const notes = await sequelize.query('SELECT * from blogs', {
// 			type: QueryTypes.SELECT,
// 		})
// 		console.log(notes)
// 		sequelize.close()
// 	} catch (error) {
// 		console.error('Unable to connect to the database:', error)
// 	}
// }

// main()
