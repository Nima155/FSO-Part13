const { sessionVerifier, loginRequired } = require('../utils/middleware')

const router = require('express').Router()

router.delete('/', sessionVerifier, loginRequired, async (req, res) => {
	delete req.user
	await req.session.destroy()
	res.json('Successful logout')
})

module.exports = router
