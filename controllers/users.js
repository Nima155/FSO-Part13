const router = require('express').Router()
const { User } = require('../models/index')
const ApiError = require('../error/ApiError')

router.post('/', async (req, res) => {
	try {
		const newUser = await User.create(req.body)
		return res.json(newUser)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

router.get('/', async (_, res) => {
	const allUsers = await User.findAll()
	return res.json(allUsers)
})

router.put('/:username', async (req, res, next) => {
	const wantedUser = await User.findOne({
		// old username
		where: {
			username: req.params.username,
		},
	})

	const newOneOnServer = await User.findOne({
		// new username
		where: {
			username: req.body.username,
		},
	})

	if (!wantedUser || newOneOnServer) {
		next(
			!wantedUser
				? ApiError.notFound('Username does not exist!')
				: ApiError.badRequest('Username taken!')
		)
		return
	}

	wantedUser.username = req.body.username
	const user = await wantedUser.save()
	res.json(user)
})
module.exports = router
