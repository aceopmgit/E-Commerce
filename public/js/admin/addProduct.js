const token = localStorage.getItem('adminToken');

const add = document.getElementById('addProduct');
add.addEventListener('submit', addProduct);

async function addProduct(e) {
    try {
        e.preventDefault();

        let title = document.getElementById("title").value;
        let price = document.getElementById("price").value;
        let image = document.getElementById("image").value;
        let color = document.getElementById("color").value;
        let category = document.getElementById("category").value;




        const details = {
            title: title,
            price: price,
            image: image,
            color: color,
            category: category,

        };


        const res = await axios.post(`/admin/addProduct`, details, { headers: { "Authorization": token } });
        console.log(res.data);


        // document.getElementById("title").value = "";
        // document.getElementById("price").value = "";
        // document.getElementById("color").value = "";
        // document.getElementById("image").value = "";
        // document.getElementById("category").value = "";
        add.reset()


    } catch (err) {
        document.body.innerHTML =
            document.body.innerHTML + `<h4 style="color: red;">${err.message}</h4>`;
        console.log(err);
    }



}