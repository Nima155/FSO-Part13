const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const ApiError = require('../error/ApiError')
const { User } = require('../models/index')
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

const sessionVerifier = async (req, res, next) => {
	if (!(req.session && req.session.userId)) {
		next(ApiError.unauthorized('Invalid or missing session'))
	}
	req.user = await User.findByPk(req.session.userId)

	if (req.user === null) {
		next(ApiError.notFound('No such user exists on the database'))
	}
	next()
}

const loginRequired = async (req, res, next) => {
	if (!req.user) {
		next(ApiError.unauthorized('must be logged in!'))
	}
	next()
}

const userBanned = async (req, res, next) => {
	if (req.user.disabled) {
		next(ApiError.unauthorized('You have been banned'))
	}
	next()
}

module.exports = {
	tokenVerifier,
	sessionVerifier,
	loginRequired,
	userBanned,
}
