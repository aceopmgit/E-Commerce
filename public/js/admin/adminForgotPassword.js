const changePasswordForm = document.getElementById('changePasswordForm');
changePasswordForm.addEventListener('submit', resetEmail);
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

        const res = await axios.post(`/admin/resetEmail`, details);
        document.getElementById('alertMessage').innerHTML = res.data.message;
        const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
        alertModal.show();




    }
    catch (err) {
        // document.getElementById('alertMessage').innerHTML = err.response.data.message;
        // const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
        // alertModal.show();
        console.log(err);

    }



}