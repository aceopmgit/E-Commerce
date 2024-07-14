async function showProducts(page) {
    try {
        const token = localStorage.getItem('adminToken')
        const res = await axios.get(`/admin/getAllProducts?page=${page}`, { headers: { "Authorization": token } });

        localStorage.setItem('editPage', page);

        const productsList = document.getElementById('productList');


        const products = res.data.products
        console.log(products.length, products)
        productsList.innerHTML = products
            .map((product) =>
                `
      <div class="product">
      <img src="${product.image}" alt="${product.title}" class="product-img">
          <div class="product-info">
              <h2 class="product-title">${product.title}</h2>
              <p class="product-price">₹ ${product.originalPrice.toFixed(2)}</p>
              <a class="edit-Product" id="${product._id}" href="/admin/editProduct?id=${product._id}">Edit</a>
          </div>
      </div>`

            ).join("");

        // Array.from(document.getElementsByClassName('edit-Product')).forEach((x) => {
        //     x.addEventListener('click', (e) => {
        //         const id = e.target.id;
        //         console.log(id)
        //         window.location.href = `/admin/editProduct?id=${id}`;
        //     })
        // })


        showPagination(res)

        console.log(res.data)




    }
    catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
        console.log(err);
    }

}
function showPagination(res) {
    const { currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage } = res.data;
    const rpagination = document.getElementById('rpagination');

    rpagination.innerHTML = "";
    //console.log(rpagination)
    const pli = document.createElement('li');
    const cli = document.createElement('li');
    const nli = document.createElement('li');

    if (hasPreviousPage) {
        pli.className = 'page-item'
        const pbtn = document.createElement('button');
        pbtn.className = 'page-link';
        pbtn.innerHTML = previousPage
        pli.appendChild(pbtn);
        pbtn.addEventListener('click', () => {
            pli.className = 'page-item active'
            cli.className = 'page-item'
            nli.className = 'page-item'
            showProducts(previousPage);
        });
        rpagination.appendChild(pli);
    }
    cli.className = 'page-item active'
    const cbtn = document.createElement('button');
    cbtn.className = 'page-link';
    cbtn.innerHTML = currentPage;
    cli.appendChild(cbtn);
    cbtn.addEventListener('click', () => {
        pli.className = 'page-item'
        nli.className = 'page-item'
        showProducts(currentPage);
    });
    rpagination.appendChild(cli);

    if (hasNextPage) {
        nli.className = 'page-item'
        const nbtn = document.createElement('button');
        nbtn.className = 'page-link';
        nbtn.innerHTML = nextPage;
        nli.appendChild(nbtn);
        nbtn.addEventListener('click', () => {
            pli.className = 'page-item'
            cli.className = 'page-item'
            nli.className = 'page-item active'
            showProducts(nextPage);
        });
        rpagination.appendChild(nli);

    }
}


window.addEventListener('DOMContentLoaded', async () => {
    try {
        let page = localStorage.getItem('editPage') || 1;
        showProducts(page);

    }
    catch (err) {

        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
        console.log(err);
    }
})