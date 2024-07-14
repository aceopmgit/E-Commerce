const token = localStorage.getItem('adminToken');
const logout = document.getElementById('logoutYes');
logout.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login'

});
const createAdminForm = document.getElementById('createAdminForm');
createAdminForm.addEventListener('submit', createAdmin);

//code for the token
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function createAdmin(e) {
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
            `/admin/createAdmin`,
            details,
            { headers: { "Authorization": token } }
        );

        document.getElementById('createAdminClose').click()
        document.getElementById('alertMessage').innerHTML = res.data.message;
        const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
        alertModal.show();
        createAdminForm.reset();


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

async function showAdmins() {
    try {
        const res = await axios.get('/admin/showAdmins', { headers: { "Authorization": token } });
        const selectAdminForm = document.getElementById('selectAdminForm');
        selectAdminForm.innerHTML = res.data.users.map((ele) => `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="${ele.email}" required>
            <label class="form-check-label" for="${ele.email}">${ele.email}</label>
        </div>
        `).join("")

    } catch (err) {
        console.log(err);
    }
}

const selectAdminForm = document.getElementById('selectAdminForm');
selectAdminForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const radioButtons = document.querySelectorAll('input[name="flexRadioDefault"]');

    let selectedValue;

    for (i of radioButtons) {
        if (i.checked) {
            selectedValue = i.value;
            break;
        }
    }
    const res = await axios.get(`/admin/getAdminInfo?email=${selectedValue}`, { headers: { "Authorization": token } });

    document.getElementById("aName").value = res.data.users[0].name;
    document.getElementById("aEmail").value = res.data.users[0].email;
    document.getElementById('oldAdminEmail').innerHTML = selectedValue;
    console.log(document.getElementById('oldAdminEmail').innerHTML);

    document.getElementById('selectAdminClose').click()
    const editAdmin = new bootstrap.Modal(document.getElementById('editAdminModal'));
    editAdmin.show();
    selectAdminForm.reset()


})

const editAdminInfoForm = document.getElementById('editAdminInfoForm');
editAdminInfoForm.addEventListener('submit', async (e) => {
    try {


        e.preventDefault();

        let name = document.getElementById("aName").value;
        let email = document.getElementById("aEmail").value;
        let password = document.getElementById("aPassword").value;
        let oldEmail = document.getElementById('oldAdminEmail').innerHTML;
        console.log(name, email, password, oldEmail)

        const details = {
            Name: name,
            Email: email,
            oldEmail: oldEmail,
            Password: password,
        };

        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            return;
        }


        const res = await axios.post(
            `/admin/editAdminInfo`,
            details,
            { headers: { "Authorization": token } }
        );

        console.log(res, oldEmail);

        document.getElementById('oldAdminEmail').innerHtml = "";
        document.getElementById('editAdminInfoClose').click()
        document.getElementById('alertMessage').innerHTML = res.data.message;
        const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
        alertModal.show();
        editAdminInfoForm.reset()

    } catch (err) {
        console.log(err)
    }
})


window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');

    const parsedToken = parseJwt(token);
    const x = document.getElementById('dropdownMenu');
    if (parsedToken.master) {
        x.innerHTML = `<button class="dropdown-item" id='createAdmin' data-bs-toggle="modal"
                                data-bs-target="#createAdminModal">Create Admin</button>
                            <button class="dropdown-item" id='editAdmin' data-bs-toggle="modal"
                                data-bs-target="#selectAdminModal">Edit Admin</button>
                            <button class="dropdown-item" id='logout' data-bs-toggle="modal"
                                data-bs-target="#logoutModal">Logout</button> `

        showAdmins()
    }
    else {
        x.innerHTML = `<button class="dropdown-item" id='logout' data-bs-toggle="modal"
                                data-bs-target="#logoutModal">Logout</button> `
    }

})