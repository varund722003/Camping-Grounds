const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync.js');
const User = require('../models/user.js');
const users = require('../controllers/users.js')
const passport = require('passport');
const { storeReturnTo } = require('../middleware.js');


router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.register));
//    console.log(registeredUser);
//    req.flash('success', 'Welcome to Camping Grounds!');
//    res.redirect('/campgrounds');


router.get('/login', users.renderLogin);

router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, 
    failureRedirect: '/login'}), users.login);

router.get('/logout', users.logout);



module.exports = router;