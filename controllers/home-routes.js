const router = require('express').Router();
const { User, Blog, Comments } = require('../models/index-model');
const authenticate = require('../utils/authenticate');

router.get('/', async (req, res) => {
    try{
        const userData = await Blog.findAll({
            include: [
              {
                model: User,
                attributes: ['username'],
              },
              {
                model: Comments,
                attributes: ['comment', 'commentCreator']
              }
            ],
          })
          const userInfo = userData.map((data) => data.get({ plain: true }))
          console.log(userInfo)
        res.render('homepage', { logged_in: req.session.logged_in, userInfo });
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

router.get('/dashboard', authenticate, async (req, res) => {
    try {
        console.log(req.session.logged_in, req.session.username)
        const userData = await Blog.findAll({
            where: { username: req.session.username },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const userInfo = userData.map((data) => data.get({ plain: true }));

        res.render('dashboard', { logged_in: req.session.logged_in, userInfo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/login', (req, res) => {
    try{
        if (req.session.logged_in){
            res.render('homepage')
        }
        res.render('login')
    } catch(err){
        res.status(500).alert(err)
    }
});

module.exports = router;