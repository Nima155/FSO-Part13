const router = require('express').Router()
const { SECRET } = require('../utils/config')
const User = require('../models/user')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res, next) => {
	const body = req.body
	const user = await User.findOne({
		where: {
			username: body.username,
		},
	})

	const passwordCorrectness = body.password === 'secret'

	if (!(user !== null && passwordCorrectness)) {
		next(ApiError.unauthorized('Incorrect username or password!'))
		return
	}

	const tokenContent = {
		username: user.username,
		id: user.id,
	}

	const actualToken = jwt.sign(tokenContent, SECRET)

	res.status(200).send({ actualToken, name: user.name })
})

module.exports = router
