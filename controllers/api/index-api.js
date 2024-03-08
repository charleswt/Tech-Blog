const router = require('express').Router();
const blogs = require('./blog-routes');
const users = require('./user-routes')
const comments = require('./comments-api')

router.use('/blog', blogs);
router.use('/user', users);
router.use('/comments', comments)

module.exports = router;