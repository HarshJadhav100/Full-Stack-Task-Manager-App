const express = require('express');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = re.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next(); 

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}

module.exports = auth;
