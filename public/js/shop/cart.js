const cartItemsElement = document.getElementById('cartItems');
const cartTotalElemt = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', cartPayment);
let token = localStorage.getItem('userToken');

async function quantityUpdate(productId, quantity) {
    try {
        const res = await axios.post(`/addToCart?id=${productId}&&quantity=${quantity}`, null, { headers: { "Authorization": token } });

        console.log(res);
    }
    catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
        console.log(err);
    }
}
//function for handling debouncing
function debounce(cb, delay) {
    let timer;

    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}



async function showCartItems() {
    try {
        const res = await axios.get('/getCart', { headers: { "Authorization": token } });
        const cart = res.data.products;
        //setting cart quantity
        const cartQuantity = res.data.products.length;
        const cartIcon = document.getElementById('cart-icon');
        cartIcon.setAttribute('data-quantity', cartQuantity);

        // console.log(res.data, cart);
        if (cart.length === 0) {
            const cartData = document.getElementById('cartData');
            cartData.innerHTML = `<h4>Your cart is Empty</h4>`;
        } else {

            cartItemsElement.innerHTML = cart
                .map((item) => `
            <div class="cart-item" id="cartItem_${item.productId._id}">
                <img src="${item.productId.image}" alt="${item.productId.title}">
                <div class="cart-item-info">
                    <h2 class="cart-item-title">${item.productId.title}</h2>
                    <input type="number" name="" min="1" value="${item.quantity}" data-id="${item.productId._id}" class="cart-item-quantity">
                </div>
                <h2 class="cart-item-price">₹ <span id="price_${item.productId._id}" data-initial-price="${item.productId.originalPrice}">${item.productId.currentPrice}</span></h2>
                <button class="btn btn-danger" data-id="${item.productId._id}">Remove</button>
            </div>
        `)
                .join("");

            // localStorage.setItem('cart', JSON.stringify(cart));

            const quantityInputs = Array.from(document.getElementsByClassName('cart-item-quantity'));
            // console.log('+*+*+*+*+*', quantityInputs)
            quantityInputs.forEach((input) => {
                input.addEventListener('input', handleQuantityChange);
            })

            const removeButtons = Array.from(document.getElementsByClassName('btn btn-danger'));
            removeButtons.forEach((element) => {
                element.addEventListener('click', removeFromCart);
            })

            updateTotal();

            document.getElementById('cart-t').style.visibility = 'visible';

        }




    }
    catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
        console.log(err);
    }
    // console.log('hello')


}

function updateTotal() {
    //getting total
    const price = Array.from(document.getElementsByClassName('cart-item-price'));

    let total = 0;
    price.forEach((e) => {
        total += Number(e.firstElementChild.innerHTML);
        console.log(e.firstElementChild.innerHTML, total);
    })

    document.getElementById('cartTotal').innerHTML = `Total :₹ ${total}`;
}



const handleQuantityChange = debounce(function (event) {
    const input = event.target;
    const productId = input.getAttribute('data-id');
    let quantity = input.value;
    if (quantity <= 0) {
        input.value = 1;
        quantity = input.value;

    }

    quantityUpdate(productId, quantity);

    console.log(input, productId);
    const priceElement = document.getElementById(`price_${productId}`);
    const price = Number(priceElement.getAttribute('data-initial-price'));
    priceElement.innerHTML = price * Number(quantity);
    updateTotal()


}, 1000)

async function removeFromCart(e) {
    try {
        const productId = e.target.getAttribute('data-id');
        const res = await axios.post(`/removeFromCart?productId=${productId}`, null, { headers: { "Authorization": token } });
        //updating cart icon quantity
        const cartIcon = document.getElementById('cart-icon');
        let total = Number(cartIcon.getAttribute('data-quantity')) - 1;
        cartIcon.setAttribute('data-quantity', total);

        if (res.data.products.length > 0) {
            const element = document.getElementById(`cartItem_${productId}`);
            element.remove();
            updateTotal();
        }
        else {
            const cartData = document.getElementById('cartData');
            cartData.innerHTML = `<h4>Your cart is Empty</h4>`;
        }

    }
    catch (err) {
        console.log(err)
    }
}

async function cartPayment(e) {
    try {
        const token = localStorage.getItem('userToken');
        const res = await axios.get(`/cartPayment`, { headers: { "Authorization": token } });
        console.log(res);

        const options = {
            "key": res.data.key_id,
            "order_id": res.data.order.id,
            "handler": async function (response) {
                console.log(response);
                const ut = await axios.post(`/updateTransaction`, {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                    status: 'SUCCESSFUL'
                }, { headers: { "Authorization": token } })

                alert('Order placed successfully !');
                window.location.href = '/'

            }

        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', async function (response) {
            console.log(response)
            // alert('Something went wrong !');
            await axios.post(`/updateTransaction`, {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                status: 'FAILED'
            }, { headers: { "Authorization": token } })
            alert('Something went wrong. Please try again !')
        })

    }
    catch (err) {
        console.log(err)
    }
}




window.addEventListener('DOMContentLoaded', async () => {
    if (token) {
        showCartItems();
    }
    else {
        const cartData = document.getElementById('cartData');
        cartData.innerHTML = `<h4>Please Login for adding products to cart</h4>`;
    }

})