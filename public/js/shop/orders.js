const token = localStorage.getItem('userToken');
async function showOrders() {
    const orderItemsElement = document.getElementById('orderItems');
    try {
        //updating cart quantity
        const cartQuantity = localStorage.getItem('cartQuantity');
        const cartIcon = document.getElementById('cart-icon');
        cartIcon.setAttribute('data-quantity', cartQuantity);

        const res = await axios.get('/getOrders', { headers: { "Authorization": token } });
        // console.log(res.data)
        const orders = res.data.products;
        console.log("orders", orders)


        if (orders.length === 0) {
            const orderData = document.getElementById('orderData');
            orderData.innerHTML = `<h4>No Orders Here !</h4>`;
        } else {
            // console.log(orders);
            const orderDetails = []
            for (let i = 0; i < orders.length; i++) {
                let prodName = ""
                for (let j = 0; j < orders[i].products.length; j++) {

                    if (j !== (orders[i].products.length - 1)) {
                        console.log(j, orders[i].products[j], orders[i].products[j].productId.title, orders[i].products[j].productId);

                        prodName += orders[i].products[j].productId.title + ` (x${orders[i].products[j].quantity})` + " ,"
                    } else {
                        console.log(j, orders[i].products[j], orders[i].products[j].productId.title, orders[i].products[j].productId);
                        prodName += orders[i].products[j].productId.title + ` (x${orders[i].products[j].quantity})`;
                    }



                }

                // console.log('products name', prodName)
                // console.log('total', orders[i].amount, orders[i].products[0].productId.image)
                // console.log('total', orders[i].orderId)
                orderDetails.push({ orderName: prodName, orderAmount: orders[i].amount, orderId: orders[i].orderId, orderImage: orders[i].products[0].productId.image })
            }

            // console.log(orderDetails)
            orderItemsElement.innerHTML = orderDetails.map((e) => `
                 <div class="order-item">
                         <img src="${e.orderImage}" alt="${e.orderName}">
                     <div class="order-item-info">
                         <h2 class="order-item-title">${e.orderName}</h2>
                     </div>
                     <h2 class="order-item-price">₹ <span id="order_${e.orderId}" data-price="${e.orderAmount}">${e.orderAmount}</span></h2>
                     <a href="/viewOrder?id=${e.orderId}" class="btn btn-success">View Order</a>
                 </div>
             `)
                .join("");






        }




        //     // localStorage.setItem('cart', JSON.stringify(cart));

        //     const quantityInputs = Array.from(document.getElementsByClassName('cart-item-quantity'));
        //     // console.log('+*+*+*+*+*', quantityInputs)
        //     quantityInputs.forEach((input) => {
        //         input.addEventListener('input', handleQuantityChange);
        //     })

        //     const removeButtons = Array.from(document.getElementsByClassName('btn btn-danger'));
        //     removeButtons.forEach((element) => {
        //         element.addEventListener('click', removeFromCart);
        //     })

        //     updateTotal();

        //     document.getElementById('cart-t').style.visibility = 'visible';

        // }




    }
    catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
        console.log(err);
    }
    // console.log('hello')


}

window.addEventListener('DOMContentLoaded', async () => {
    showOrders();
})