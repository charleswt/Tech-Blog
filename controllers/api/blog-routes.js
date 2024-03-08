const router = require('express').Router();
const { Blog, User } = require('../../models/index-model');
const authenticate = require('../../utils/authenticate');

router.post('/createPost', authenticate, async (req, res) => {
  try {
    console.log(req.body.title, req.body.content)
    console.log(req.session.user_id, req.session.username)
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
      username: req.session.username,
    });
    console.log(newBlog)

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/textToUpdate/:id', async (req, res) => {
  try {
    const blogId = req.params.id;

    const blogData = await Blog.findByPk(blogId, {
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });
    console.log(blogData)
    if (!blogData) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/updatePost/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await Blog.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: postId } }
    );

    res.status(200).json({ message: 'Post updated successfully.', updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const BlogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!BlogData) {
      res.status(404).json({ message: 'Id not found' });
      return;
    }

    res.status(200).json(BlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
