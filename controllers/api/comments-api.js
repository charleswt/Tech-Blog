const router = require('express').Router();
const { Blog, Comments } = require('../../models/index-model')

router.post('/comment/:blogId', async (req, res) => {
    try {
      const username = req.session.username;
      const { blogId } = req.params;
      const { comment } = req.body;
  
      if (!comment) {
        return res.status(400).json({ message: 'Comment content is required' });
      }
  
      const blog = await Blog.findByPk(blogId);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      const userData = await Comments.create({ comment, commentCreator: username, blog_id: blogId });
  
      res.status(201).json({ userData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;