const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models/index')
const ApiError = require('../error/ApiError')

router.post('/', async (req, res, next) => {
	try {
		const newUser = await User.create(req.body)
		return res.json(newUser)
	} catch (err) {
		next(ApiError.badRequest(err.message))
	}
})

router.get('/', async (_, res) => {
	const allUsers = await User.findAll({
		include: {
			model: Blog,
			attributes: ['title', 'author'],
		},
	})
	return res.json(allUsers)
})

router.get('/:id', async (req, res) => {
	const id = req.params.id

	const user = await User.findByPk(id, {
		attributes: ['name', 'username'],
		include: [
			{
				model: Blog,
				attributes: ['id', 'title', 'author', 'year', 'likes', 'url'],
				through: {
					attributes: ['id', 'read'],
				},
				as: 'readings',
			},
		],
	})
	return res.json(user)
})

router.put('/:username', async (req, res, next) => {
	const wantedUser = await User.findOne({
		where: {
			username: req.params.username,
		},
	})

	if (!wantedUser || !req.body.name) {
		next(
			!wantedUser
				? ApiError.notFound('Username does not exist!')
				: ApiError.badRequest('missing name field')
		)
		return
	}

	wantedUser.name = req.body.name
	const user = await wantedUser.save()
	res.json(user)
})
module.exports = router
