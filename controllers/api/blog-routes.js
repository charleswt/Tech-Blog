const router = require('express').Router();
const { Blog } = require('../../models/index-model');
const authenticate = require('../../utils/authenticate');

router.post('/', authenticate, async (req, res) => {
    try {
      const newProject = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;