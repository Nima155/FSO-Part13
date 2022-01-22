require('dotenv').config()
const express = require('express')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const apiErrorHandler = require('./error/apiErrorHandler')

app.use(express.json())
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
