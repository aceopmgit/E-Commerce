const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.userAuthenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const u = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(u.userId);
        req.user = user;
        next()
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            Error: err,
            success: false
        })
    }
}