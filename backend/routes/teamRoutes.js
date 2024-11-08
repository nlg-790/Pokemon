// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// const authMiddleware = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).json({ message: 'Access denied' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid token' });
//     }
// };

// router.post('/save', authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.userId);
//         user.teams.push(req.body.team);
//         await user.save();
//         res.json({ message: 'Team saved successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// router.get('/', authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.userId);
//         res.json(user.teams);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// module.exports = router;

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); 
const User = require('../models/User');
const router = express.Router();

router.post('/save', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.teams.push(req.body.team);
        await user.save();
        res.json({ message: 'Team saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user.teams);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

