const blogs = require('./blog-routes');

router.use('/blog', blogs)

module.exports = router;