const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try{
    const { username, email, password } = req.body;

    const existingUser = await findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    } 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });

}catch (error) {
    res.json({ message: 'Error registering user', error: error.message });
}});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }   
        const token = jwt.sign(
            { userId: user._id },
             process.env.JWT_SECRET, 
             { expiresIn: '1h' });
        } catch (error) {
            res.json({ message: 'Error logging in', error: error.message });
        }
});

module.exports = router;
