const router = require('express').Router()
const { tokenVerifier } = require('../utils/middleware')
const { ReadingList, User, Blog } = require('../models/index')
const ApiError = require('../error/ApiError')
router.put('/:id', tokenVerifier, async (req, res, next) => {
	const { read } = req.body

	const entry = await ReadingList.findByPk(req.params.id)

	if (!entry) {
		next(ApiError.badRequest('no entry with the given id'))
		return
	}

	if (entry.userId !== req.decodedToken.id) {
		next(ApiError.unauthorized('Unauthorized!'))
		return
	}

	try {
		entry.read = read
		const newEntry = await entry.save()
		return res.json(newEntry)
	} catch (err) {
		next(ApiError.badRequest(err.message))
	}
})

router.post(
	'/',
	/*, tokenVerifier,*/ async (req, res, next) => {
		const { blog_id, user_id } = req.body

		if (!/\d+/.test(blog_id) || !/\d+/.test(user_id)) {
			next(
				ApiError.badRequest(
					'blog_id and user_id must be present and be of type INT'
				)
			)
			return
		}
		const userIsPresent = (await User.findByPk(user_id)) !== null
		const blogIsPresent = (await Blog.findByPk(blog_id)) !== null

		if (!userIsPresent || !blogIsPresent) {
			next(ApiError.badRequest('no user/blog exists with the given id'))
			return
		}

		try {
			const reading = await ReadingList.create({
				blogId: blog_id,
				userId: user_id,
			})
			return res.json(reading)
		} catch (err) {
			next(ApiError.badRequest(err.message))
		}
	}
)

module.exports = router
