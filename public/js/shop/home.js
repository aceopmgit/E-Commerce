const website = 'http://localhost:4000';

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', signup);

const login = document.getElementById("loginForm");
login.addEventListener("submit", loginUser);

async function signup(e) {
  try {

    e.preventDefault();

    let name = document.getElementById("sname").value;
    let email = document.getElementById("semail").value;
    let password = document.getElementById("spassword").value;

    const details = {
      Name: name,
      Email: email,
      Password: password,
    };

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return;
    }


    const res = await axios.post(
      `/home/addUser`,
      details
    );

    document.getElementById('signupModalClose').click()
    const modal = new bootstrap.Modal(document.getElementById('loginModal'))
    modal.show()


  } catch (err) {
    if (err.response.status === 409) {
      alert(err.response.data.message);
    }
    else {

      document.body.innerHTML =
        document.body.innerHTML + `<h4 style="color: red;">${err}</h4>`;
      console.log(err);
    }
  }
}

async function loginUser(e) {
  e.preventDefault();

  let email = document.getElementById("lemail").value;
  let password = document.getElementById("lpassword").value;

  const details = {
    Email: email,
    Password: password,
  };

  try {
    const res = await axios.post(
      `/home/loginCheck`,
      details
    );

    localStorage.setItem("userToken", res.data.token);
    document.getElementById('loginModalClose').click();

    //document.getElementById("email").value = "";
    //document.getElementById("password").value = "";
  } catch (err) {
    if (err.response.status < 500) {
      alert(err.response.data.message);
    }
    else {

      document.body.innerHTML =
        document.body.innerHTML + `<h4 style="color: red;">${err}</h4>`;
      console.log(err);
    }
  }

}



//show products on page
async function showProducts(category, page) {
  try {
    let res;
    if (page) {
      res = await axios.get(`/home/get${category}Products?page=${page}`);
      if (category === 'Men') {
        localStorage.setItem('mPage', page)
        localStorage.removeItem('wPage');
        localStorage.removeItem('kPage');
      }
      if (category === 'Women') {
        localStorage.setItem('wPage', page)
        localStorage.removeItem('mPage');
        localStorage.removeItem('kPage');
      }
      if (category === 'Kids') {
        localStorage.setItem('kPage', page)
        localStorage.removeItem('wPage');
        localStorage.removeItem('mPage');
      }

    }
    else {

      res = await axios.get(`/home/get${category}Products`);
      localStorage.removeItem('wPage');
      localStorage.removeItem('mPage');
      localStorage.removeItem('kPage');
      console.log(res);
    }


    const productsList = document.getElementById('productList');


    const products = res.data.products
    console.log(products.length, products)
    productsList.innerHTML = products
      .map((product) =>
        `
    <div class="product">
        <a href="/home/viewProduct?id=${product._id}"><img src="${product.image}" alt="${product.title}" class="product-img"></a>
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">Rs.${product.price.toFixed(2)}</p>
            <a class="add-to-cart" id="${product._id}">Add to Cart</a>
        </div>
    </div>`

      ).join("");

    const addButtons = Array.from(document.getElementsByClassName('add-to-cart'));
    addButtons.forEach((element) => {
      element.addEventListener('click', async function () {
        this.innerHTML = "Added";
        this.style.backgroundColor = 'Blue';
        // console.log(this.id);

        await axios.post(`/addToCart?id=${this.id}`)
      });
    })


    // addToCart = Array.from(addToCart);
    // console.log('Add to cart', addToCart);

    if (window.location.href !== `${website}/home`) {
      showPagination(res)
    }
    // console.log(res.data)




  }
  catch (err) {
    document.body.innerHTML =
      document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
    console.log(err);
  }

}

function showPagination(res) {
  const { currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage } = res.data;
  let category = res.data.category;
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
      showProducts(category, previousPage);
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
    showProducts(category, currentPage);
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
      showProducts(category, nextPage);
    });
    rpagination.appendChild(nli);

  }
}

window.addEventListener('DOMContentLoaded', async () => {
  try {

    if (window.location.href === `${website}/home`) {
      showProducts('Featured');
      console.log('***********')

    }

    if (window.location.href === `${website}/home/men`) {
      const page = localStorage.getItem('mPage') || 1

      // const res = await axios.get(`/home/getMenProducts?page=${page}`);
      showProducts("Men", page);
    }

    if (window.location.href === `${website}/home/women`) {
      const page = localStorage.getItem('wPage') || 1

      // const res = await axios.get(`/home/getWomenProducts?page=${page}`);
      showProducts('Women', page);
    }

    if (window.location.href === `${website}/home/kids`) {
      const page = localStorage.getItem('kPage') || 1

      // const res = await axios.get(`/home/getKidsProducts?page=${page}`);
      showProducts('Kids', page);
    }

  }
  catch (err) {
    document.body.innerHTML =
      document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
    console.log(err);
  }

})


