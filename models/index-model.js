const Blog = require('./blog-model');
const User = require('./user-model');
const Comments = require('./comment-model');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
})

Blog.hasMany(Comments, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Blog, {
    foreignKey: 'comment_id'
})

module.exports = { User, Blog, Comments }