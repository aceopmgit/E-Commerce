const token = localStorage.getItem('userToken');
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function showProduct(id) {
    try {
        const res = await axios.get(`/getProduct?id=${id}`);


        const productTile = document.getElementById('productTile');
        const product = res.data.product[0];
        console.log(product)

        document.getElementsByTagName('title').innerHtml = product.title;


        productTile.innerHTML = `
        <div class="product">
        <img src="${product.image}" alt="${product.title}" class="product-img">
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">₹ ${product.originalPrice}</p>
            <a class="add-to-cart" id="${product._id}">Add to Cart</a>
        </div>
        </div>`

        const addButton = document.getElementById(product._id);
        addButton.addEventListener('click', async (e) => {

            const button = e.target;
            try {


                if (!token) {
                    console.log(token)
                    document.getElementById('alertMessage').innerHTML = 'Please Login for placing order';
                    const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
                    alertModal.show();
                    console.log(typeof this.id);
                    return

                }

                const productId = button.id;

                if (button.disabled) {
                    return
                }

                button.disabled = true;

                const res = await axios.post(`/addToCart?id=${productId}&&quantity=1`, null, { headers: { "Authorization": token } });

                if (res.status === 200) {
                    console.log(button)
                    button.innerHTML = "Added";
                    button.style.backgroundColor = '#2885ee';
                    const cartIcon = document.getElementById('cart-icon');
                    let total = Number(cartIcon.getAttribute('data-quantity')) + 1;
                    cartIcon.setAttribute('data-quantity', total);

                }
                else {
                    throw new Error('Failed to add to cart')
                }

            }
            catch (err) {
                document.body.innerHTML =
                    document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
                console.log(err);

            }
            finally {
                button.disabled = false;
            }
        })
        console.log(addButton)

    } catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
    }
}
async function updateCartIcon() {
    try {
        const res = await axios.get('/home/getCart', { headers: { "Authorization": token } });
        const cartQuantity = res.data.products.length;

        const cartIcon = document.getElementById('cart-icon');
        cartIcon.setAttribute('data-quantity', cartQuantity);

    }
    catch (err) {
        console.log(err)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (token) {
        updateCartIcon();
    }
    showProduct(productId);

})

