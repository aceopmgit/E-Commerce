const jwt = require('jsonwebtoken');
const adminUser = require('../models/AdminUser');

exports.adminAuthenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const u = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await adminUser.findById(u.userId);
        req.adminUser = user;
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