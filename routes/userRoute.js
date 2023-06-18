const express = require('express');
const router = express.Router();


const usercon = require('../controllers/userController');


// User Routes
router.post('/register', usercon.register);
router.post('/login', usercon.login);
router.get('/profile', usercon.getProfile);
// ...




router.route('/login/:login_id')
.get(usercon.createUser)
.get(usercon.getUserById)
.get(usercon.loginUser)




module.exports =  router;
