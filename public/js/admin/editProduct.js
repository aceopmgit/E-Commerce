
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId)
const token = localStorage.getItem('adminToken');

async function editProduct(id) {
    try {
        console.log('editProduct', id)
        const res = await axios.get(`/admin/getProduct?id=${id}`, { headers: { "Authorization": token } });

        const product = res.data.product[0];
        console.log(product)

        document.getElementById('title').value = product.title;
        document.getElementById('color').value = product.color;
        document.getElementById('price').value = product.price;
        document.getElementById('image').value = product.image;
        document.getElementById('category').value = product.category;

    } catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
    }
}


const editForm = document.getElementById('editProduct');
editForm.addEventListener('submit', updateProduct);

async function updateProduct() {
    try {
        const title = document.getElementById('title').value;
        const color = document.getElementById('color').value;
        const price = document.getElementById('price').value;
        const image = document.getElementById('image').value;
        const category = document.getElementById('category').value;

        const details = {
            title, color, price, image, category
        };

        const res = await axios.post(`/admin/updateProduct?id=${productId}`, details, { headers: { "Authorization": token } });

        console.log('res data', res)
        window.location.href = "/admin/edit";



    }
    catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;

    }


}

window.addEventListener('DOMContentLoaded', async () => {
    editProduct(productId);

})

