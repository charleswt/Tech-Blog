const router = require('express').Router();
const blogs = require('./blog-routes');
const users = require('./user-routes')

router.use('/blog', blogs);
router.use('/user', users)

module.exports = router;