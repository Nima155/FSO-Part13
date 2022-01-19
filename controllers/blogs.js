const router = require('express').Router()
const { Blog } = require('../models')
const ApiError = require('../error/ApiError')
router.get('/', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

router.put('/:id', async (req, res, next) => {
	const id = req.params.id
	const blog = await Blog.findByPk(id)

	if (blog === null) {
		next(
			ApiError.notFound('could not find a blog with the given id on the server')
		)
		return
	} else if (req.body.likes === null || !/\d+/.test(req.body.likes)) {
		next(ApiError.badRequest('Invalid or missing number of likes'))
		return
	}

	blog.likes = req.body.likes
	await blog.save()
	return res.json({
		likes: blog.likes,
	})
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
router.post('/', async (req, res, next) => {
	const new_blog = req.body

	Blog.create(new_blog)
		.then((entity) => {
			res.json(entity)
		})
		.catch((err) => next(ApiError.badRequest(err.message)))
})

module.exports = router
