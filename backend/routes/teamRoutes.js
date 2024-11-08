// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/register', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ email, password: hashedPassword });
//         await user.save();

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(201).json({ token });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) throw new Error('User not found');

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) throw new Error('Incorrect password');

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
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



