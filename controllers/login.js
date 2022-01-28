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
	req.session.userId = user.id // creates session on the database and sets a cookie for the client browser

	const tokenContent = {
		username: user.username,
		id: user.id,
	}

	const actualToken = jwt.sign(tokenContent, SECRET) // redundant...

	res.status(200).send({ actualToken, name: user.name })
})

module.exports = router
