const path = require('path');

exports.errorMessage = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "..", "views", "error.html"));
}