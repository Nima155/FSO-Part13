require('dotenv').config()
const express = require('express')

const app = express()
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
})

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
	},
	{
		sequelize,
		timestamps: false,
		underscored: true,
		modelName: 'blog',
	}
)
Blog.sync() // automatically creates the table if it does not exist...
app.use(express.json())
app.get('/api/blogs', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})
app.delete('/api/blogs/:id', async (req, res) => {
	const id = req.params.id
	try {
		const blog = await Blog.findByPk(id)
		await blog.destroy()
		return res.status(200).end()
	} catch (err) {
		return res.status(400).json({ err })
	}
})
app.post('/api/blogs', async (req, res) => {
	const new_blog = req.body
	try {
		const new_blog_1 = await Blog.create(new_blog)
		return res.json(new_blog_1)
	} catch (err) {
		return res.status(400).json({ err })
	}
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})

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
