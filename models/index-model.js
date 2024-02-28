const Blog = require('./blog-model');
const User = require('./user-model');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKay: 'user_id'
})

module.exports = { User, Blog }