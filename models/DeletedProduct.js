const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deletedProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true

    },
    title: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true

    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'AdminUser',
        required: true
    },
    createdDate: {
        type: Date,

    },
    deleteDate: {
        type: Date,
        default: Date.now// Setting default value to current date/time
    }
})

deletedProductSchema.pre('save', function (next) {
    // Set createdDate to current date/time if not already set
    if (!this.createdDate) {
        this.createdDate = new Date();
    }
    next();
});

module.exports = mongoose.model('Deleted_Product', deletedProductSchema);