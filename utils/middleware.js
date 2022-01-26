const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const ApiError = require('../error/ApiError')

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

module.exports = {
	tokenVerifier,
}
