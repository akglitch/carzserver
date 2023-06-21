const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create user', details: error.message });
  }
}



async function getAllUsers(req, res) {
  try {
    // Implement the logic to fetch all users from the database or any other data source
    // For example, if you have a User model defined, you can use it to retrieve all users:
    const users = await User.find(); // Assuming you have a User model
    
    // Send the users as a response
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve users',
    });
  }
}


async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Update the user properties
    user.name = name;
    user.email = email;

    // Hash the new password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update user', details: error.message });
  }
}


async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Delete the user
    await user.deleteOne();

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete user', details: error.message });
  }
}


async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to login', details: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user', details: error.message });
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  createUser,
  loginUser,
  getUserById
};
