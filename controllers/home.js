const path = require('path');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTransport } = require('nodemailer');

const AdminUser = require('../models/AdminUser');
const Product = require('../models/Product');
const User = require("../models/User");
const Order = require('../models/Order');
const ChangePassword = require('../models/UserChangePassword');


const { men, women, kids, featured } = require('../public/extras/products');

exports.home = (req, res, next) => {
    masterCheck()
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'home.html'));
}
exports.men = (req, res, next) => {
    masterCheck()
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'men.html'));
}
exports.women = (req, res, next) => {
    masterCheck()
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'women.html'));
}

exports.kids = (req, res, next) => {
    masterCheck()
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'kids.html'));
}

exports.viewProduct = (req, res, next) => {

    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'viewProduct.html'));
}

exports.cart = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'cart.html'));
}

exports.orders = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'orders.html'));
}

exports.viewOrder = (req, res, next) => {

    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'viewOrder.html'));
}
exports.viewAllSeachProducts = (req, res, next) => {

    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'viewAllSearchProducts.html'));
}

async function masterCheck() {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const masterUser = {
            Name: 'Master',
            Email: 'master@gmail.com',
            Password: 'master123456'
        }

        let master = await AdminUser.findOne({ email: masterUser.Email });
        console.log(master)
        if (master == null) {
            console.log('line70***homeC', master)
            bcrypt.hash(masterUser.Password, 10, async (err, hash) => {
                try {
                    const user = new AdminUser({
                        name: masterUser.Name,
                        email: masterUser.Email,
                        master: true,
                        password: hash
                    });

                    const x = await user.save();
                    ProductCheck();
                    console.log('lone81 homeC**********', x)
                    await session.commitTransaction();
                } catch (err) {
                    console.log(err)
                }

            })
        }



    }
    catch (err) {
        await session.abortTransaction();
        console.log(err);
    }


}
// masterCheck();
async function ProductCheck() {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const allproducts = await Product.find();

        if (allproducts.length === 0) {
            const master = await AdminUser.findOne({ email: 'master@gmail.com' });
            console.log(master)
            let a = men.map(async (x) => {
                let product = new Product({
                    title: x.title,
                    originalPrice: x.price,
                    currentPrice: x.price,
                    category: x.category,
                    userId: master._id,
                    image: x.image,
                    color: x.color,
                    edited: x.edited
                });
                await product.save()
                return product;


            })
            let b = women.map(async (x) => {
                let product = new Product({
                    title: x.title,
                    originalPrice: x.price,
                    currentPrice: x.price,
                    category: x.category,
                    userId: master._id,
                    image: x.image,
                    color: x.color,
                    edited: x.edited
                });
                await product.save()
                return product;


            })
            let c = kids.map(async (x) => {
                let product = new Product({
                    title: x.title,
                    originalPrice: x.price,
                    currentPrice: x.price,
                    category: x.category,
                    userId: master._id,
                    image: x.image,
                    color: x.color,
                    edited: x.edited
                });
                await product.save()
                return product;


            })
            let d = featured.map(async (x) => {
                let product = new Product({
                    title: x.title,
                    originalPrice: x.price,
                    currentPrice: x.price,
                    category: x.category,
                    userId: master._id,
                    image: x.image,
                    color: x.color,
                    edited: x.edited
                });
                await product.save()
                return product;


            })

            await session.commitTransaction();

            let w = await Promise.all(a);
            let x = await Promise.all(b);
            let y = await Promise.all(c);
            let z = await Promise.all(d);

            // console.log('*************************PRODUCT************', w, x, y, z);
        }
    } catch (err) {
        await session.abortTransaction();

        console.log(err);
    }
    finally {
        session.endSession();
    }


}

function isStringInvalid(string) {
    if (string === undefined || string.length === 0) {
        return true
    }
    else {
        return false
    }
}

function generateAccessToken(id, name, email, address) {
    return jwt.sign({ userId: id, name: name, email: email, address: address }, process.env.TOKEN_SECRET);
}

exports.addUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const name = req.body.Name;
        const email = req.body.Email;
        const password = req.body.Password;

        let userExist = await User.findOne({ email })

        if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)) {
            return res.status(400).json({ status: false, message: 'Bad Parameter. Something is Misssing !' });
        }

        if (!userExist) {
            bcrypt.hash(password, 10, async (err, hash) => {
                console.log(err);

                const user = new User({
                    name: name,
                    email: email,
                    password: hash,
                },);

                await user.save()

                await session.commitTransaction()
                res.status(201).json({ status: true, message: "User Signed Up Successfully" });
            });
        }
        else {
            res.status(409).json({ message: 'Email already exist!' });
        }


    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            Error: err,
        });
        console.log(err)
    } finally {
        session.endSession
    }
};

exports.loginCheck = async (req, res, next) => {
    try {
        const email = req.body.Email;
        const password = req.body.Password;

        if (isStringInvalid(email) || isStringInvalid(password)) {
            return res.status(400).json({ status: false, message: 'Bad Parameter. Something is Misssing !' });
        }

        const loginDetail = await User.findOne({ email: email });
        // console.log(`****************loginDetails***********${loginDetail}*********************${loginDetail._id}`);
        if (loginDetail) {
            bcrypt.compare(password, loginDetail.password, (err, result) => {
                if (result === true) {
                    res.status(200).json({
                        success: true,
                        message: "User Logged in Successfully !",
                        token: generateAccessToken(loginDetail._id, loginDetail.name, loginDetail.email, loginDetail.address),
                    });
                } else {
                    res
                        .status(400)
                        .json({ success: false, message: "Incorrect Password !" });
                }
            });
        } else {
            res.status(404).json({ success: false, message: "User not Found" });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err,
        });
        console.log(err)
    }
};

exports.editUserInfo = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const name = req.body.Name;
        const email = req.body.Email;
        const address = req.body.Address;



        if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(address)) {
            return res.status(400).json({ status: false, message: 'Bad Parameter. Something is Misssing !' });
        }

        await User.updateOne({ id: req.user._id }, { name: name, email: email, address: address });
        await session.commitTransaction()
        res.status(201).json({ status: true, message: "User Information Updated Successfully !" });


    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            Error: err,
        });
        console.log(err)
    } finally {
        session.endSession
    }
};

exports.resetEmail = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        // console.log(req.body.email)
        // console.log('user******99999999', u)
        const user = await User.findOne({ email: req.body.email }).select('_id name');

        if (req.user.email === req.body.email) {
            const f = new ChangePassword({ isActive: true, userId: user._id });
            const s = await f.save();

            console.log(`*******saved********${s}*************`)

            const transporter = createTransport({
                host: 'smtp-relay.sendinblue.com',
                port: 587,
                auth: {
                    user: 'ace.opm.sales@gmail.com',
                    pass: process.env.EMAIL_API_KEY
                }
            })
            const mailOptions = {
                from: 'ace.opm.sales@gmail.com',
                to: req.body.email,
                subject: 'Change Password',
                html: `<P>Here is your change password link</P>
                <a href="${process.env.WEBSITE}/resetpassword/${s._id}">Change Your Password</a>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                } else {
                    res.status(201).json({ message: 'Link for password change sent to your mail ', sucess: true });
                    console.log('Email Sent' + info.response)
                }
            })
            await session.commitTransaction();

        } else {
            // res.status(400).json({ message: `Please enter valid email of the account`, sucess: false });
            throw new Error('Please enter valid email of the account!')
        }
    } catch (err) {
        await session.abortTransaction();
        console.log('*********************************************************' + err)
        res.status(404).json({ message: `${err}`, sucess: false });
    }
    finally {
        session.endSession();
    }
};

exports.resetpassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const rPassword = await ChangePassword.findOne({ _id: id });
        if (rPassword && rPassword.isActive === true) {
            ChangePassword.updateOne({ _id: id }, { $set: { isActive: false } })
            res.status(200).send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- link to css  -->
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.2.3/css/bootstrap.min.css" rel="stylesheet">

    <!-- box icons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Password</title>
</head>

<body class="home">
    <header>
        <div class="py-2" id="main-header">
            <div class="container d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">

                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAcFJREFUWEft17tqVUEUxvFfvGChAQsRFS0skkJ8Ay0s9C0URC3sVCyEqEhABEXU1kbBwkbfQBsb30BBIaTwgoKFoIGA17NkTthscs7M2U6RwJ7mwMxa3/rvb65nyhprU2uMRw+Um5HeoUkduoB5TOcSK41/wzXcHeq1p+w7tlYqViqzhG2jgP6UqlSOWzGm7dC6AbqOX8mVq9hQ6FDkRG60jbgyIm9ih3bhcxL7iN2FQO+xL8XuwYdaQEfwIok9xMlCoPs4m2KP4lktoFu4lMRm8TpNwTiuZUTsuxR0D+dqAX3BfsSxEC3OqzsZl04h3Iy2HYvpd7W0iddQiATAxYZaFLyJHa0KsU7O42mjPzfNnYBC/zQeNAptwQnsTX1v8GSwm342YuIjbmfc7AwU59SZFtS4Wpcb235cXGegoehz3Eg773er0mYcw9xgVx0q3I3/DTSs8xUv8XbgxCbM4HCH+7AaUKEB2bAeKGdR71DvUM6B3Pj6WUM/0gGX+6Ka43Hvxen+r7Xf1K9woGa1Aq2oeXAU0HE8WgW0QLdTSNyD8Vp4PAoo+uM+istxZ6cS5Umf0pN2oZnS/7fPGdg7lHPoL4VXTSWM0mESAAAAAElFTkSuQmCC"
                        class="mr-3" height="30" />
                    <span>MYCART.com</span>

                </div>

            </div>
        </div>


    </header>

    <!-- Alert message modal -->
    <div class="modal fade" id="alertMessageModal">

        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">



                <div class="modal-body" style="background-color: #f7af93;">
                    <p><b id="alertMessage"></b></p>
                </div>

                <div class="modal-footer" style="background-color: #f7af93">
                    <button class="btn btn-outline-secondary" data-bs-dismiss="modal"
                        data-bs-target="#modal">OK</button>
                </div>
            </div>
        </div>
    </div>

    </div>


    <div class="row">
        <div class="col-sm-12 col-md-6 mx-auto">
            <div class="container">
                <br />
                <br />
                <div class="card" style="background-color: #f7af93">
                    <div class="card-body">
                        <h2 class="card-title">Login</h2>

                        <form id="changePasswordForm">
                            <div class="form-floating">
                                <input type="password" id="currentPassword" name="currentPassword" class="form-control"
                                    placeholder="Enter Current Password" required />
                                <label for="currentPassword" class="form-label">Enter Current Password</label>
                                <br />
                            </div>

                            <div class="form-floating">
                                <input type="password" id="newPassword" name="newPassword" class="form-control"
                                    placeholder="Enter New Password" required />
                                <label for="newPassword" class="form-label">Enter New Password</label>
                                <br />
                            </div>

                            <div class="form-floating">
                                <input type="password" id="confirmNewPassword" name="confirmNewPassword"
                                    class="form-control" placeholder="Confirm New Password" required />
                                <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
                                <br />
                            </div>

                            <br>
                            <p id="error" style="color: red;"></p>

                            <button class="btn btn-block" type="submit"
                                style="color: black; background-color: #e94c0e;">Update Password</button>
                        </form>
                        <br>

                        <br>
                        <br>



                    </div>
                </div>
            </div>
        </div>
    </div>



    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.2.3/js/bootstrap.bundle.min.js"></script>
    <script>
        const changePasswordForm = document.getElementById('changePasswordForm');
        changePasswordForm.addEventListener('submit', resetPassword);

        async function resetPassword(e) {
            try {
                e.preventDefault()
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById("newPassword").value;
                const confirmNewPassword = document.getElementById("confirmNewPassword").value;

                if (currentPassword.trim() === "" || newPassword.trim() === "" || confirmNewPassword.trim() === "") {
                    document.getElementById('error').innerHTML = 'Please Enter valid password';
                    return
                }

                if (newPassword !== confirmNewPassword) {
                    document.getElementById('error').innerHTML = 'Password do not match';
                    return
                }

                const details = {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                }
                const res = await axios.post("/updatepassword/${id}", details)
                // document.getElementById('alertMessage').innerHTML = res.data.message;
                // const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
                // alertModal.show();
                alert(res.data.message);

                window.location.href = "/";


            } catch (err) {
                console.log(err)
                document.getElementById('alertMessage').innerHTML = err.response.data.message;
                const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
                alertModal.show();
                //alert(err)                        
            }
        }
    </script>
</body>

</html>`
            )
            res.end();
        } else {
            throw new Error('Invalid Request !')
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: `${err}`, sucess: false });
    }

}

exports.updatepassword = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const { resetPasswordId } = req.params;

        const reset = await ChangePassword.findOne({ _id: resetPasswordId });

        const user = await User.findOne({ _id: reset.userId });

        //checking current Password 

        if (user) {
            bcrypt.compare(currentPassword, user.password, async (err, result) => {
                if (result === true) {
                    if (newPassword !== confirmNewPassword) {
                        res
                            .status(400)
                            .json({ success: false, message: "Password do not match !" });
                    }


                    const hash = await bcrypt.hash(newPassword, 10);
                    await User.updateOne({ _id: user._id }, { $set: { password: hash } });

                    res.status(200).json({ status: true, message: "User Password reset successful" });
                } else {
                    res
                        .status(400)
                        .json({ success: false, message: "Incorrect Password !" });
                }
            });

        }
        else {
            throw new Error('No user exists');
        }

    } catch (err) {
        await session.abortTransaction();
        console.error(err);
        res.status(404).json({ error: err.message || 'Internal server error', success: false });
    } finally {
        session.endSession();
    }
}




exports.getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ category: 'Featured' });
        res.status(201).json({
            products: products,
            succcess: true,
            category: 'Featured'
        });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }
}

exports.getMenProducts = async (req, res, next) => {

    try {
        let limit = 8;
        let page = Number(req.query.page);

        const total = await Product.find({ category: 'Men' });
        const products = await Product.find({ category: 'Men' }).skip((page - 1) * limit).limit(limit);
        res.status(201).json({
            products: products,
            currentPage: page,
            hasNextPage: limit * page < total.length,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            succcess: true,
            category: 'Men'
        });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }


}

exports.getProduct = async (req, res, next) => {

    try {
        let id = req.query.id;

        const product = await Product.find({ _id: id });
        res.status(201).json({
            product: product,
            succcess: true,
        });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }


}

exports.getWomenProducts = async (req, res, next) => {

    try {


        let limit = 8;
        let page = Number(req.query.page);

        const total = await Product.find({ category: 'Women' });
        const products = await Product.find({ category: 'Women' }).skip((page - 1) * limit).limit(limit);
        res.status(201).json({
            products: products,
            currentPage: page,
            hasNextPage: limit * page < total.length,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            succcess: true,
            category: 'Women'

        });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }


}

exports.getKidsProducts = async (req, res, next) => {

    try {


        let limit = 8;
        let page = Number(req.query.page);

        const total = await Product.find({ category: 'Kids' });
        const products = await Product.find({ category: 'Kids' }).skip((page - 1) * limit).limit(limit);
        res.status(201).json({
            products: products,
            currentPage: page,
            hasNextPage: limit * page < total.length,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            succcess: true,
            category: 'Kids'
        });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }


}

exports.getCart = async (req, res, next) => {

    try {
        let x = await req.user.populate('cart.items.productId')
        let products = req.user.cart.items;

        products.forEach((e) => {
            e.productId.currentPrice = e.productId.originalPrice * e.quantity;
        })


        res.status(200).json({ success: true, products: products });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }


}

exports.addToCart = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const id = req.query.id;
        const quantity = req.query.quantity;
        // console.log(id, quantity)

        const product = await Product.findById(id);
        const result = await req.user.addToCart(product, quantity);

        await session.commitTransaction();
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err)
        await session.abortTransaction();
        res.status(500).json({
            Error: err,
            success: true
        });
    } finally {
        session.endSession();

    }


}

exports.removeFromCart = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const id = req.query.productId;
        console.log(id);
        const products = await req.user.deleteItemFromCart(id);

        await session.commitTransaction();
        res.status(200).json({ success: true, products: products.cart.items });
    } catch (err) {
        console.log(err)
        await session.abortTransaction();
        res.status(500).json({
            Error: err,
            success: true
        });
    } finally {
        session.endSession();

    }


}

exports.cartPayment = async (req, res, next) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZOR_KEY_ID,
            key_secret: process.env.RAZOR_KEY_SECRET
        })
        let x = await req.user.populate('cart.items.productId')
        let products = req.user.cart.items;


        let total = products.reduce((acc, curr) => {
            return acc + (curr.productId.currentPrice * curr.quantity)
        }, 0)


        // console.log('************+++++++++++++****************', products, total)

        const amount = total * 100;
        rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            try {
                if (err) {
                    throw new Error(JSON.stringify(err));
                }
                const o = new Order({ orderId: order.id, status: 'PENDING', userId: req.user._id, products: products, orderAmount: (amount / 100) });
                // console.log('*************order***************', o.products)
                await o.save();
                return res.status(201).json({ order, key_id: rzp.key_id });
            } catch (err) {
                console.error(err)
                return res.status(403).json({
                    message: 'Something went wrong !',
                    Error: err.message
                })
            }

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }



}

exports.updateTransaction = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { order_id, payment_id, status } = req.body;
        console.log('********************update*********************************', req.body)
        if (status === 'SUCCESSFUL') {
            const updateUser = await req.user.clearCart()
        }
        const updateOrder = await Order.updateOne(
            { orderId: order_id },
            { $set: { paymentId: payment_id, status: status } },
            { session }
        );
        console.log('line 877**********home_control', updateOrder);



        // await Promise.all([updateOrder, updateUser]);

        await session.commitTransaction();

        res.status(201).json({
            success: status === 'SUCCESSFUL',
            message: status === 'SUCCESSFUL' ? 'Transaction Successful' : 'Transaction Failed',
        });
    } catch (err) {
        await session.abortTransaction();
        console.log(err);
        res.status(403).json({
            message: 'Something went wrong!',
            Error: err.message
        });
    } finally {
        session.endSession();
    }
};



exports.getOrders = async (req, res, next) => {

    try {
        // let x = await req.user.populate('cart.items.productId')
        let x = await Order.find({ userId: req.user._id, status: "SUCCESSFUL" }).populate('products.productId');
        // let products = req.user.cart.items;
        console.log('line 909 home controller***************', x[0].products)
        const products = x.map((e) => {
            return { products: e.products, amount: e.orderAmount, orderId: e._id }
        })
        console.log('line 913*********homeC', products);
        // console.log('**********orders******', x[0].products, x, products[])
        // console.log('orderAmt****************', x, x.orderAmount)

        // products.forEach((e) => {
        //     e.productId.currentPrice = e.productId.originalPrice * e.quantity;
        // })


        res.status(200).json({ success: true, products: products, total: x.orderAmount });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }


}

exports.getOrder = async (req, res, next) => {

    try {
        let id = req.query.id;

        const order = await Order.findOne({ _id: id }).populate('products.productId');

        console.log('*****Order******', order.products[0].productId)

        order.products.forEach((e) => {
            e.productId.currentPrice *= e.quantity
        })
        console.log(order)



        // const product = await Product.find({ _id: id });
        res.status(201).json({
            order: order,
            succcess: true,
        });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }


}

exports.seachProducts = async (req, res, next) => {

    try {
        let search = req.query.search;
        const regex = new RegExp(search, 'i')
        const products = await Product.find({ title: { $regex: regex } })

        //sort the arrays according to most number of matched characters
        const sortedResult = products.sort((a, b) => {
            const aMatches = a.title.match(regex).join('').length;
            const bMatches = b.title.match(regex).join('').length;
            return bMatches - aMatches
        })
        console.log('8888888888888888888', products.length, sortedResult.length);


        // console.log('*******searchresults****************', products);
        res.status(201).json({
            products: products,
            succcess: true,
        });
        // const order = await Order.findOne({ _id: id }).populate('products.productId');

        // console.log('*****Order******', order.products[0].productId)

        // order.products.forEach((e) => {
        //     e.productId.currentPrice *= e.quantity
        // })
        // console.log(order)



        // // const product = await Product.find({ _id: id });
        // res.status(201).json({
        //     order: order,
        //     succcess: true,
        // });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }


}