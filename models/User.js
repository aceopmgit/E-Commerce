const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    address: {
        type: String
    },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, min: 1 }
            }
        ]
    },
    favourites: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
            }
        ]
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('User', userSchema);

