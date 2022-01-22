const router = require('express').Router()
const { Blog, User } = require('../models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const tokenVerifier = async (req, res, next) => {
	const authorization = req.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
		} catch (err) {
			next(ApiError.unauthorized('Invalid token'))
		}
	} else {
		next(ApiError.badRequest('missing token!'))
	}
	next()
}

router.get('/', async (req, res) => {
	const blogs = await Blog.findAll({
		attributes: { exclude: 'userId' },
		include: { model: User, attributes: ['username', 'name'] },
	})
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

router.delete('/:id', tokenVerifier, async (req, res, next) => {
	const id = req.params.id
	try {
		const blog = await Blog.findByPk(id)
		if (!(blog.userId === req.decodedToken.id)) {
			next(
				ApiError.unauthorized('Only the author of the blog can remove the blog')
			)
			return
		}
		await blog.destroy()
		return res.status(200).end()
	} catch (err) {
		return res.status(400).json({ err })
	}
})
router.post('/', tokenVerifier, async (req, res, next) => {
	const new_blog = req.body
	const foundUser = await User.findByPk(req.decodedToken.id)
	if (foundUser) {
		Blog.create({ ...new_blog, userId: foundUser.id })
			.then((entity) => {
				res.json(entity)
			})
			.catch((err) => next(ApiError.badRequest(err.message)))
	} else {
		next(ApiError.notFound('No such user exists on the database!'))
	}
})

module.exports = router
