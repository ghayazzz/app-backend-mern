// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware');
// require('dotenv').config();

// const router = express.Router();

// // User registration route
// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ name, email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // User login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Authenticated route example
// router.get('/user', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// router.get('/checkAuth', authMiddleware, (req, res) => {
//   res.json({ authenticated: true });
// });

// module.exports = router;

//blacklist only
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware');
// require('dotenv').config();

// const router = express.Router();

// // Import the shared tokenBlacklist if you use the shared module approach
// const tokenBlacklist = require('../config/tokenBlacklist');

// // User registration route
// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ name, email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // User login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // User logout route
// router.post('/logout', authMiddleware, (req, res) => {
//   const token = req.header('x-auth-token');
//   if (token) {
//     tokenBlacklist.add(token);
//     res.json({ msg: 'Logged out successfully' });
//   } else {
//     res.status(400).json({ msg: 'No token provided' });
//   }
// });

// // Authenticated route example
// router.get('/user', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Check authentication route
// router.get('/checkAuth', authMiddleware, (req, res) => {
//   res.json({ authenticated: true });
// });

// module.exports = router;


// user data + blacklist
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware');
// require('dotenv').config();

// const router = express.Router();

// // Import the shared tokenBlacklist if you use the shared module approach
// const tokenBlacklist = require('../config/tokenBlacklist');

// // User registration route
// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ name, email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // User login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // User logout route
// router.post('/logout', authMiddleware, (req, res) => {
//   const token = req.header('x-auth-token');
//   if (token) {
//     tokenBlacklist.add(token);
//     res.json({ msg: 'Logged out successfully' });
//   } else {
//     res.status(400).json({ msg: 'No token provided' });
//   }
// });

// // Authenticated route example
// router.get('/user', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Check authentication route
// router.get('/checkAuth', authMiddleware, (req, res) => {
//   res.json({ authenticated: true });
// });

// module.exports = router;


//new
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware');
// require('dotenv').config();

// const router = express.Router();

// // Import the shared tokenBlacklist if you use the shared module approach
// const tokenBlacklist = require('../config/tokenBlacklist');

// // User registration route
// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ name, email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // User login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // User logout route
// router.post('/logout', authMiddleware, (req, res) => {
//   const token = req.header('x-auth-token');
//   if (token) {
//     tokenBlacklist.add(token);
//     res.json({ msg: 'Logged out successfully' });
//   } else {
//     res.status(400).json({ msg: 'No token provided' });
//   }
// });

// // Authenticated route example
// router.get('/user', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Check authentication route
// router.get('/checkAuth', authMiddleware, (req, res) => {
//   res.json({ authenticated: true });
// });

// // Get list of users
// router.get('/users', authMiddleware, async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.json(users);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Admin route to add a user
// router.post('/admin/addUser', authMiddleware, async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // Admin-specific logic to check authorization could go here
    
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ name, email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     res.json({ msg: 'User added successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Admin route to delete a user by email
// router.delete('/admin/deleteUser', authMiddleware, async (req, res) => {
//   const { email } = req.body; // Expecting email in the request body
//   try {
//     // Admin-specific logic to check authorization could go here
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     await User.deleteOne({ email });
//     res.json({ msg: 'User removed successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });


// module.exports = router;


// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware');
// require('dotenv').config();

// const router = express.Router();

// // Import the shared tokenBlacklist if you use the shared module approach
// const tokenBlacklist = require('../config/tokenBlacklist');

// // User registration route
// // Ensure savedFiles is initialized as an empty array for new users
// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const newUser = new User({ name, email, password, savedFiles: [] });
//     await newUser.save();
//     res.status(201).json({ msg: 'User created successfully' });
//   } catch (error) {
//     console.error('Error during signup:', error);
//     res.status(500).send('Server error');
//   }
// });


// // User login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // User logout route
// router.post('/logout', authMiddleware, (req, res) => {
//   const token = req.header('x-auth-token');
//   if (token) {
//     tokenBlacklist.add(token);
//     res.json({ msg: 'Logged out successfully' });
//   } else {
//     res.status(400).json({ msg: 'No token provided' });
//   }
// });

// // Authenticated route example
// router.get('/user', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Check authentication route
// router.get('/checkAuth', authMiddleware, (req, res) => {
//   res.json({ authenticated: true });
// });

// // Get list of users
// router.get('/users', authMiddleware, async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.json(users);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Admin route to add a user
// router.post('/admin/addUser', authMiddleware, async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // Admin-specific logic to check authorization could go here
    
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({ name, email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     res.json({ msg: 'User added successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Admin route to delete a user by email
// router.delete('/admin/deleteUser', authMiddleware, async (req, res) => {
//   const { email } = req.body; // Expecting email in the request body
//   try {
//     // Admin-specific logic to check authorization could go here
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     await User.deleteOne({ email });
//     res.json({ msg: 'User removed successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });


// module.exports = router;




const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();
const tokenBlacklist = require('../config/tokenBlacklist');

// User registration route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({ name, email, password, savedFiles: [] });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Server error');
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// User logout route
router.post('/logout', authMiddleware, (req, res) => {
  const token = req.header('x-auth-token');
  if (token) {
    tokenBlacklist.add(token);
    res.json({ msg: 'Logged out successfully' });
  } else {
    res.status(400).json({ msg: 'No token provided' });
  }
});

// Authenticated route example
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Check authentication route
router.get('/checkAuth', authMiddleware, (req, res) => {
  res.json({ authenticated: true });
});

// Authenticated route to get saved projects for a user
router.get('/user/savedProjects', authMiddleware, async (req, res) => {
  try {
    // Find the user by ID and select only the savedFiles field
    const user = await User.findById(req.user.id).select('savedFiles');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return the list of saved files
    res.json(user.savedFiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to delete a specific file from the user's savedFiles array
router.delete('/user/savedProjects', authMiddleware, async (req, res) => {
  const { fileName } = req.body; // Expecting fileName in the request body

  try {
    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Remove the file from the savedFiles array
    user.savedFiles = user.savedFiles.filter(file => file !== fileName);
    await user.save();

    res.json({ msg: 'File removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// Get list of all users (for admin purposes)
router.get('/admin/users', authMiddleware, async (req, res) => {
  try {
    // Ensure the requester is an admin (you might want to add an admin check here)
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new user (admin only)
router.post('/admin/addUser', authMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Ensure the requester is an admin (you might want to add an admin check here)
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({ name, email, password, savedFiles: [] });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).send('Server error');
  }
});

// Delete a user (admin only)
router.delete('/admin/deleteUser/:id', authMiddleware, async (req, res) => {
  const userId = req.params.id;
  try {
    // Ensure the requester is an admin (you might want to add an admin check here)
    await User.findByIdAndDelete(userId);
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Authenticated route to get saved projects for a user
router.get('/admin/user/savedProjects', authMiddleware, async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId).select('savedFiles');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.savedFiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to add a project to a user's savedFiles array
router.post('/admin/user/savedProjects', authMiddleware, async (req, res) => {
  const { fileName, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.savedFiles.includes(fileName)) {
      user.savedFiles.push(fileName);
      await user.save();
    }

    res.json({ msg: 'File added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to remove a specific file from a user's savedFiles array
router.delete('/admin/user/savedProjects', authMiddleware, async (req, res) => {
  const { fileName, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.savedFiles = user.savedFiles.filter(file => file !== fileName);
    await user.save();

    res.json({ msg: 'File removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
