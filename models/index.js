const Blog = require('./blog')

Blog.sync() // automatically creates the table if it does not exist...

module.exports = {
	Blog,
}
