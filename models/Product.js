const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'AdminUser',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true

    },
    edited: {
        type: Boolean,
        default: false,
    },
    editedBy: {
        type: Schema.Types.ObjectId
    },
    createdDate: {
        type: Date,
        default: Date.now// Setting default value to current date/time
    },
    editDate: {
        type: Date,
    }
})

productSchema.pre('save', function (next) {
    // Set createdDate to current date/time if not already set
    if (!this.createdDate) {
        this.createdDate = new Date();
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);