const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create(req.body);
        console.log(user);
        const token = generateToken(user._id);
        console.log(token);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailUser = email.toLowerCase();
        const user = await User.findOne({ email: emailUser });
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            res.status(200).json({ user, token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { registerUser, loginUser };
