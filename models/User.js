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
    createdDate: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.addToCart = function (product, quantity) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() == product._id.toString();
    })

    let updatedCartItem = [...this.cart.items];
    if (cartProductIndex >= 0) {
        // q=this.cart.items[cartProductIndex].quantity+quantity;
        updatedCartItem[cartProductIndex].quantity = quantity;
    }
    else {
        updatedCartItem.push({ productId: product._id, quantity: quantity })
    }
    const updatedCart = { items: updatedCartItem };
    this.cart = updatedCart;
    return this.save();

}

userSchema.methods.deleteItemFromCart = function (prodId) {
    const updatedcartItem = this.cart.items.filter((i) => {
        return i.productId.toString() !== prodId.toString();
    })
    this.cart.items = updatedcartItem;
    return this.save()
}
userSchema.method.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
}


module.exports = mongoose.model('User', userSchema);

