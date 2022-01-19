const ApiError = require('./ApiError')
function apiErrorHandler(err, req, res, next) {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ error: err.message })
	}
	res.status(400).json({ message: 'something went wrong!' })
}

module.exports = apiErrorHandler
