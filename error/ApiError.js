class ApiError {
	constructor(status, message) {
		this.status = status
		this.message = message
	}
	static notFound(msg) {
		return new ApiError(404, msg)
	}
	static badRequest(msg) {
		return new ApiError(400, msg)
	}
	static unauthorized(msg) {
		return new ApiError(401, msg)
	}
}

module.exports = ApiError
