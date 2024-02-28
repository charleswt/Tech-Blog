const router = require('express').Router();
const { User, Blog } = require('../models/index-model');
const authenticate = require('../utils/authenticate');

router.get('/', authenticate, async (req, res) => {
    try{
        res.render('/')
    }catch(err){
        res.status(500).alert(err)
    }
})

module.exports = router;