const website = 'https://e-commerce-wheat-phi-28.vercel.app';
// const website = 'http://localhost:4000';
const token = localStorage.getItem('userToken');

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', signup);

const login = document.getElementById("loginForm");
login.addEventListener("submit", loginUser);

const editInfo = document.getElementById("editProfileInfoForm");
editInfo.addEventListener("submit", editProfileInfo);

const editInfoShow = document.getElementById("editProfileModalLauncher");
editInfoShow.addEventListener("click", () => {
  const userInfo = parseJwt(token);
  let address;
  if (userInfo.address) {
    address = userInfo.address;
  }
  else {
    address = 'Please add address for placing order'
  }

  //showing info in edit profile modal
  document.getElementById('pName').value = userInfo.name;
  document.getElementById('pEmail').value = userInfo.email;
  document.getElementById('pAddress').value = address;

});

const changePasswordForm = document.getElementById('changePasswordForm');
changePasswordForm.addEventListener('submit', resetEmail);

const logout = document.getElementById('logoutYes');
logout.addEventListener('click', () => { localStorage.removeItem('userToken') });




//code for the token
function parseJwt(token) {
  console.log('++++****++++++*****++++++++', token)
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

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
      `/addUser`,
      details
    );

    document.getElementById('signupModalClose').click()
    document.getElementById('login').click();
    // const modal = new bootstrap.Modal(document.getElementById('loginModal'))
    // modal.show()


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
      `/loginCheck`,
      details
    );
    let token = res.data.token

    localStorage.setItem("userToken", token);
    document.getElementById('loginModalClose').click();
    alert(res.data.message);
    window.location.reload();
    // document.getElementById('alertMessage').innerHTML = res.data.message;
    // const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
    // alertModal.show();
    afterLoginButtons(token);

  } catch (err) {
    console.log(err)
    if (err.response.status < 500) {
      document.getElementById('alertMessage').innerHTML = err.response.data.message;
      const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
      alertModal.show();
      // alert(err.response.data.message);
    }
    else {

      document.body.innerHTML =
        document.body.innerHTML + `<h4 style="color: red;">${err}</h4>`;
      // console.log(err);
    }
  }

}

//after login actions
function afterLoginButtons(token) {
  const dropdown = document.getElementById('dropdown-menu');
  dropdown.innerHTML = `  <button class="dropdown-item" id="profile" data-bs-toggle="modal"
                                data-bs-target="#profileModal">Profile</button>
                                <a class="dropdown-item" href="/orders">Orders</a>
                            <button class="dropdown-item" id='logout' data-bs-toggle="modal"
                                data-bs-target="#logoutModal">Logout</button> `

  showProfileInfo(token);
}

//showing profile info in profile modal
function showProfileInfo(token) {
  console.log(token)
  const userInfo = parseJwt(token);
  const profileInfo = document.getElementById('profileInfo')
  let address;
  if (userInfo.address) {
    address = userInfo.address;
  }
  else {
    address = 'Please add address for placing order'
  }
  profileInfo.innerHTML = `                        
                        <p><b>Name</b> :${userInfo.name} </p>
                        <p><b>Email</b> :${userInfo.email}</p>
                        <p><b>Address</b> :${address}</p>
                        <br>

                        <button class="btn btn-primary"  data-bs-toggle="modal"
                                data-bs-target="#changePasswordModal">Change Password</button>
                        
                        
  `

}
//saving updated Profile info
async function editProfileInfo(e) {
  try {

    e.preventDefault();

    let name = document.getElementById("pName").value;
    let email = document.getElementById("pEmail").value;
    let address = document.getElementById("pAddress").value;

    const details = {
      Name: name,
      Email: email,
      Address: address,
    };

    if (name.trim() === "" || email.trim() === "" || address.trim() === "") {
      documemt.getElementById('editInfoErrorMessage').innerHTML = 'Please enter valid information !'
      return;
    }


    const res = await axios.post(
      `/editUserInfo`,
      details,
      { headers: { "Authorization": token } }
    );

    document.getElementById('editProfileModalClose').click()
    document.getElementById('alertMessage').innerHTML = res.data.message;
    const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
    alertModal.show();

    // const modal = new bootstrap.Modal(document.getElementById('loginModal'))
    // modal.show()


  } catch (err) {
    document.getElementById('alertMessage').innerHTML = res.data.message;
    const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
    alertModal.show();
    console.log(err)
  }
}

//for sending reset Email;
async function resetEmail(e) {
  try {
    e.preventDefault()
    const email = document.getElementById('cEmail').value;
    if (email.trim() === "") {
      return
    }
    const details = {
      email: email
    }

    const res = await axios.post(`/resetEmail`, details, { headers: { "Authorization": token } });
    document.getElementById('changePasswordClose').click();
    document.getElementById('alertMessage').innerHTML = res.data.message;
    const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
    alertModal.show();




  }
  catch (err) {
    document.getElementById('alertMessage').innerHTML = err.response.data.message;
    const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
    alertModal.show();
    console.log(err);

  }



}


//show products on page
async function showProducts(category, page) {
  try {
    let res;
    if (page) {
      res = await axios.get(`/get${category}Products?page=${page}`);
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

      res = await axios.get(`/get${category}Products`);
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
        <a href="/viewProduct?id=${product._id}"><img src="${product.image}" alt="${product.title}" class="product-img"></a>
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

        const res = await axios.post(`/addToCart?id=${productId}&&quantity=1`, null, { headers: { "Authorization": token } });

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




    if (window.location.href !== `${website}/`) {
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

async function updateCartIcon() {
  try {
    const res = await axios.get('/getCart', { headers: { "Authorization": token } });
    const cartQuantity = res.data.products.length;

    const cartIcon = document.getElementById('cart-icon');
    cartIcon.setAttribute('data-quantity', cartQuantity);

  }
  catch (err) {
    console.log(err)
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

    if (token) {
      afterLoginButtons(token);
      updateCartIcon()
    }

    if (window.location.href === `${website}/`) {
      showProducts('Featured');
      console.log('***********')

    }

    if (window.location.href === `${website}/men`) {
      const page = localStorage.getItem('mPage') || 1

      showProducts("Men", page);
    }

    if (window.location.href === `${website}/women`) {
      const page = localStorage.getItem('wPage') || 1

      showProducts('Women', page);
    }

    if (window.location.href === `${website}/kids`) {
      const page = localStorage.getItem('kPage') || 1

      showProducts('Kids', page);
    }

  }
  catch (err) {
    document.body.innerHTML =
      document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
    console.log(err);
  }

})

//implementing search functionality;

//function for handling debouncing
function debounce(cb, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args)
    }, delay)
  }
}

async function searchProducts(query) {
  try {
    const res = await axios.get(`/seachProducts?search=${query}`);
    // console.log(res)
    displayResult(res);


  } catch (err) {
    console.log(err)
  }
}

function displayResult(res) {
  const result = document.getElementById('results');
  result.innerHTML = "";
  // console.log(res.data.products);
  const products = res.data.products
  //limiting the number of searches shown
  let limitedProducts;
  if (products.length > 10) {
    limitedProducts = products.slice(0, 10)
  }
  else {
    limitedProducts = products;
  }
  result.innerHTML = limitedProducts.map((e) => `
  <div class="result-item">
        <a href="/viewProduct?id=${e._id}" class="text-reset text-decoration-none">${e.title}</a>
    </div>
  `
  ).join("");
  result.style.visibility = "visible"
}

const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('input', debounce((e) => {
  const query = e.target.value;
  if (query.trim().length > 0) {
    searchProducts(query)
  }
  else {
    document.getElementById('results').innerHTML = "";
  }

}, 400))

//for showing all search products
const searchBtn = document.getElementById('seachBtn');
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const searchValue = document.getElementById('searchBox').value;
  console.log(searchValue);
  if (searchValue.trim().length === 0) {
    return
  }
  const destinationUrl = `/viewAllSeachProducts?search=${searchValue}`;

  window.location.href = destinationUrl;
})


//hide result when clicked outside
document.addEventListener('click', (event) => {
  const isClickInside = document.getElementById('results').contains(event.target);

  if (!isClickInside) {
    document.getElementById('results').style.visibility = 'hidden';
  }

})







