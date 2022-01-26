const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'user_list' })

// User.sync({ alter: true })
// Blog.sync({ alter: true }) // automatically creates the table if it does not exist...
module.exports = {
	Blog,
	User,
	ReadingList,
}
