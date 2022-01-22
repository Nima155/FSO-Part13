const router = require('express').Router()
const { sequelize } = require('../utils/db')
const sqlz = require('sequelize')
const { Blog } = require('../models/index')
router.get('/', async (req, res) => {
	const data = await sequelize.query(
		'SELECT author, COUNT(*) as articles , SUM(likes) as likes from blogs GROUP BY author ORDER BY likes DESC',
		{
			type: sqlz.QueryTypes.SELECT,
		}
	)

	// console.log('hi there', foundBlogs)
	return res.json(data)
})

module.exports = router
