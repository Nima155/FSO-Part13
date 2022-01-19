const router = require('express').Router()
const { Blog } = require('../models')
router.get('/', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

router.put('/:id', async (req, res) => {
	const id = req.params.id
	try {
		const blog = await Blog.findByPk(id)
		blog.likes = req.body.likes
		await blog.save()
		return res.json({
			likes: blog.likes,
		})
	} catch (error) {
		return res.status(404).json({
			error,
		})
	}
})

router.delete('/:id', async (req, res) => {
	const id = req.params.id
	try {
		const blog = await Blog.findByPk(id)
		await blog.destroy()
		return res.status(200).end()
	} catch (err) {
		return res.status(400).json({ err })
	}
})
router.post('/', async (req, res) => {
	const new_blog = req.body
	try {
		const new_blog_1 = await Blog.create(new_blog)
		return res.json(new_blog_1)
	} catch (err) {
		return res.status(400).json({ err })
	}
})

module.exports = router
