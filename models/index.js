const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

User.sync({ alter: true })
Blog.sync({ alter: true }) // automatically creates the table if it does not exist...
module.exports = {
	Blog,
	User,
}
