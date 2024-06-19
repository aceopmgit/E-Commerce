const login = document.getElementById("login");
login.addEventListener("submit", submitUser);


async function submitUser(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const details = {
        Email: email,
        Password: password,
    };

    try {
        const res = await axios.post(
            `/admin/loginCheck`,
            details
        );
        alert(res.data.message);
        localStorage.setItem("adminToken", res.data.token);
        window.location.href = "/admin/";

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



