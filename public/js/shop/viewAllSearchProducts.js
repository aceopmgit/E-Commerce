const token = localStorage.getItem('userToken');
const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');

console.log(search)

//show products on page
async function showProducts(category, page) {
    try {
        const productsList = document.getElementById('productList');
        const res = await axios.get(`/home/seachProducts?search=${search}`);

        const products = res.data.products
        console.log(products.length, products)
        productsList.innerHTML = products
            .map((product) =>
                `
      <div class="product">
          <a href="/home/viewProduct?id=${product._id}"><img src="${product.image}" alt="${product.title}" class="product-img"></a>
          <div class="product-info">
              <h2 class="product-title">${product.title}</h2>
              <p class="product-price">₹ ${product.originalPrice.toFixed(2)}</p>
              <a class="add-to-cart" id="${product._id}">Add to Cart</a>
          </div>
      </div>`

            ).join("");


        //Adding eventListener to add to cart buttons 
        const addButtons = Array.from(document.getElementsByClassName('add-to-cart'));
        async function addToCartFunction(e) {
            const button = e.target;
            try {

                const token = localStorage.getItem('userToken');

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

                const res = await axios.post(`/home/addToCart?id=${productId}&&quantity=1`, null, { headers: { "Authorization": token } });

                if (res.status === 200) {
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


        }

        // const debounceHandleClick = debounce(addToCartFunction, 1000);
        //Add product to cart
        addButtons.forEach((element) => {
            element.addEventListener('click', addToCartFunction);
        })

    }
    catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
        console.log(err);
    }

}

showProducts();
