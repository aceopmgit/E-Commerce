const token = localStorage.getItem('userToken');
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function showOrder(id) {
    const orderItemsElement = document.getElementById('orderItems');
    try {
        const res = await axios.get(`/getOrder?id=${id}`, { headers: { "Authorization": token } });
        const products = res.data.order.products
        console.log(products, res.data)


        orderItemsElement.innerHTML = products.map((e) => `
        <div class="order-item"">
        <img src="${e.productId.image}" alt="${e.productId.title}">
        <div class="order-item-info">
            <h2 class="order-item-title">${e.productId.title}</h2>
            <h5 class="order-item-title">x${e.quantity}</h5>
        </div>
        <h2 class="order-item-price">₹ <span>${e.productId.currentPrice}</span></h2>
    </div>
        `).join("")

        document.getElementById('orderTotal').innerHTML = `₹ ${res.data.order.orderAmount}`


        //         cartItemsElement.innerHTML = cart
        //         .map((item) => `
        // <div class="cart-item" id="cartItem_${item.productId._id}">
        //     <img src="${item.productId.image}" alt="${item.productId.title}">
        //     <div class="cart-item-info">
        //         <h2 class="cart-item-title">${item.productId.title}</h2>
        //         <input type="number" name="" min="1" value="${item.quantity}" data-id="${item.productId._id}" class="cart-item-quantity">
        //     </div>
        //     <h2 class="cart-item-price">₹ <span id="price_${item.productId._id}" data-initial-price="${item.productId.originalPrice}">${item.productId.currentPrice}</span></h2>
        //     <button class="btn btn-danger" data-id="${item.productId._id}">Remove</button>
        // </div>
        // `)
        //         .join("");

    } catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
    }
}

showOrder(productId);

