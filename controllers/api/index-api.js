const router = require('express').Router();
const blogs = require('./blog-routes');

router.use('/blog', blogs)

module.exports = router;