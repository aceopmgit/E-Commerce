
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function showProduct(id) {
    try {
        const res = await axios.get(`/home/getProduct?id=${id}`);


        const productTile = document.getElementById('productTile');
        const product = res.data.product[0];
        // console.log(product)

        document.getElementsByTagName('title').innerHtml = product.title;


        productTile.innerHTML = `
        <div class="product">
        <img src="${product.image}" alt="${product.title}" class="product-img">
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">Rs.${product.price}</p>
            <a class="add-to-cart" data-id="${product._id}">Add to Cart</a>
        </div>
        </div>`

    } catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
    }
}

showProduct(productId);

