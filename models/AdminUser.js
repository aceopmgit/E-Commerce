const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    master: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now // Setting default value to current date/time
    }

})


module.exports = mongoose.model('AdminUser', AdminUserSchema);
