const router = require('express').Router();
const { User } = require('../../models/index-model');

router.post('/login', async (req, res) => {
    try{
        
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Bad POST request from /login'})
    }
});

module.exports = router;