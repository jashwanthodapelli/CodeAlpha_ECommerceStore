const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper to read users from JSON file
async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper to write users to JSON file
async function writeUsers(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
    }

    const users = await readUsers();
    
    // Check if user already exists
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists.' });
    }

    // Create new user
    const newUser = {
      id: 'u-' + Date.now(),
      name,
      email: email.toLowerCase(),
      password, // Stored in plain text for simplicity of student submission
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    // Return session data (excluding password for safety)
    const { password: _, ...sessionUser } = newUser;
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: sessionUser,
      token: `mock-token-${newUser.id}`
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password.' });
    }

    const users = await readUsers();
    
    // Find matching user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Return session data
    const { password: _, ...sessionUser } = user;
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: sessionUser,
      token: `mock-token-${user.id}`
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
});

module.exports = router;
