const express = require('express');
const router = express.Router();
const userService = require('../services/user')

//login endpoint
router.post('/login', (req, res, next)=>{
    res.send(userService.login(req))
})

// Register user 
router.post('/register', (req, res, next)=>{
    res.send(userService.register(req))
})

//Log out method. 
router.post('/logout', (req, res, next)=>{
    res.send(userService.logout(req))
})


module.exports = router;