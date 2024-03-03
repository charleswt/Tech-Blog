const router = require('express').Router();
const { User, Blog } = require('../models/index-model');
const authenticate = require('../utils/authenticate');

router.get('/', async (req, res) => {
    try{
        const userData = await Blog.findAll({

        })
        res.render('homepage', { logged_in: req.session.logged_in, userData });
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/dashboard', authenticate, (req, res) => {
    try{
        res.render('dashboard')
    } catch(err){
        res.status(500).alert(err)
    }
})

router.get('/login', (req, res) => {
    try{
        if (req.session.logged_in){
            return res.render('homepage')
        }
        res.render('login')
    } catch(err){
        res.status(500).alert(err)
    }
});

module.exports = router;