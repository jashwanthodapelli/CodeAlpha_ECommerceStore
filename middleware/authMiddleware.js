const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. Please login first.' });
    }

    const token = authHeader.split(' ')[1];
    
    // Parse mock-token-u-XXX
    if (!token.startsWith('mock-token-')) {
      return res.status(401).json({ success: false, message: 'Invalid authentication token.' });
    }

    const userId = token.replace('mock-token-', '');
    
    // Verify user exists
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication session expired or invalid.' });
    }

    // Bind authenticated user data to the request object
    const { password: _, ...sessionUser } = user;
    req.user = sessionUser;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ success: false, message: 'Authorization error occurred.' });
  }
};
