const express = require('express');
const router = express.Router();
const usercon = require('../controllers/userController');

// Route: /users
router.post('/user', usercon.createUser);
router.get('/users', usercon.getAllUsers);


// Route: /users/:id
router.get('/:id', usercon.getUserById);
router.patch('/:id', usercon.updateUser);
router.delete('/:id', usercon.deleteUser);

module.exports = router;
