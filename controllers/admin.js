const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTransport } = require('nodemailer');
const mongoose = require('mongoose');
const uuid = require('uuid');

const User = require('../models/AdminUser');
const ChangePassword = require('../models/AdminChangePassword');
const Product = require('../models/Product');
const DeleteProduct = require('../models/DeletedProduct');

exports.admin = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'admin.html'));
}

exports.adminLogin = (req, res, next) => {
    masterCheck();
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'admin-login.html'));
}

exports.forgotPasswordPage = (req, res, next) => {

    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'adminForgotPassword.html'));
}

exports.add = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'addProduct.html'));
}

exports.edit = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'edit.html'));
}

exports.editProduct = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'editProduct.html'));
}

exports.delete = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'delete.html'));
}

function isStringInvalid(string) {
    if (string === undefined || string.length === 0) {
        return true
    }
    else {
        return false
    }
}

function generateAccessToken(id, name, master) {
    return jwt.sign({ userId: id, name: name, master: master }, process.env.TOKEN_SECRET);
}


// masterCheck();
async function masterCheck() {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const masterUser = {
            Name: 'Master',
            Email: 'master@gmail.com',
            Password: 'master123456'
        }

        let master = await User.findOne({ email: masterUser.Email });
        if (!master) {
            bcrypt.hash(masterUser.Password, 10, async (err, hash) => {
                const user = new User({
                    name: masterUser.Name,
                    email: masterUser.Email,
                    master: true,
                    password: hash
                });

                await user.save();
                await session.commitTransaction();
            })
        }

    }
    catch (err) {
        await session.abortTransaction();
        console.log(err);
    }


}


exports.addAdmin = async (req, res, next) => {
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
        console.log(`****************loginDetails***********${loginDetail}*********************${loginDetail._id}`);
        if (loginDetail) {
            bcrypt.compare(password, loginDetail.password, (err, result) => {
                if (result === true) {
                    res.status(200).json({
                        success: true,
                        message: "User Logged in Successfully !",
                        token: generateAccessToken(loginDetail._id, loginDetail.name, loginDetail.master),
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
        console.log(err)
        res.status(500).json({
            success: false,
            message: err,
        });
    }
};

exports.addProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { title, color, price, image, category } = req.body;

        if (isStringInvalid(title) || isStringInvalid(price) || isStringInvalid(color) || isStringInvalid(image) || isStringInvalid(category)) {
            return res.status(400).json({ status: false, message: 'Bad Parameter. Something is Misssing !' });
        }

        // console.log(`********user ${req.user}************`)

        const product = new Product({
            title: title,
            color: color,
            originalPrice: price,
            currentPrice: price,
            image: image,
            category: category,
            userId: req.adminUser._id
        });

        await product.save()


        await session.commitTransaction();
        res.status(201).json({ success: true });
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

exports.getAllProducts = async (req, res, next) => {
    try {
        let limit = 20;
        let page = Number(req.query.page);

        const total = await Product.find();
        const products = await Product.find().skip((page - 1) * limit).limit(limit);
        res.status(201).json({
            products: products,
            currentPage: page,
            hasNextPage: limit * page < total.length,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
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

exports.getProduct = async (req, res, next) => {

    try {
        let id = req.query.id;
        // console.log('*************', id)

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

exports.updateProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const id = req.query.id;
        // console.log('************line270_ad_controller******************', id)
        const { title, color, price, image, category } = req.body;
        const date = new Date()
        await Product.updateOne({ _id: id }, { $set: { title: title, originalPrice: price, currentPrice: price, category: category, image: image, color: color, edited: true, editedBy: req.adminUser._id, editDate: date } });
        await session.commitTransaction()

        res.status(201).json({
            success: true,
        });
    } catch (err) {
        await session.abortTransaction()
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }
    finally {
        session.endSession()
    }
}

exports.deleteProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const id = req.query.id;
        const deletedProduct = await Product.findOne({ _id: id });
        // console.log('deleted product**********;line 299_admin con', deletedProduct)

        const product = new DeleteProduct({
            productId: deletedProduct._id,
            title: deletedProduct.title,
            originalPrice: deletedProduct.originalPrice,
            currentPrice: deletedProduct.currentPrice,
            category: deletedProduct.category,
            userId: deletedProduct.userId,
            image: deletedProduct.image,
            color: deletedProduct.color,
            deletedBy: req.adminUser._id,
            createdDate: deletedProduct.createdDate,
        });

        let x = await product.save()
        // console.log('**********deleted_product line314 admin_con*******', x)

        await Product.deleteOne({ _id: id })
        await session.commitTransaction()

        res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'delete.html'));
    } catch (err) {
        await session.abortTransaction()
        console.log(err)
        res.status(500).json({
            Error: err,
        });
    }
    finally {
        session.endSession()
    }
}

exports.resetEmail = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const user = await User.findOne({ email: req.body.email }).select('_id name');

        if (user) {
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
                <a href="${process.env.WEBSITE}/admin/resetpassword/${s._id}">Change Your Password</a>`
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
            throw new Error('User not Found !')
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
                const newPassword = document.getElementById("newPassword").value;
                const confirmNewPassword = document.getElementById("confirmNewPassword").value;

                if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
                    document.getElementById('error').innerHTML = 'Please Enter valid password';
                    return
                }

                if (newPassword !== confirmNewPassword) {
                    document.getElementById('error').innerHTML = 'Password do not match';
                    return
                }

                const details = {
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                }
                const res = await axios.post("/admin/updatepassword/${id}", details)
                // document.getElementById('alertMessage').innerHTML = res.data.message;
                // const alertModal = new bootstrap.Modal(document.getElementById('alertMessageModal'));
                // alertModal.show();
                alert(res.data.message);
                document.getElementById('error').innerHTML = '';

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
        const { email, newPassword, confirmNewPassword } = req.body;
        const { resetPasswordId } = req.params;

        const reset = await ChangePassword.findOne({ _id: resetPasswordId });

        const user = await User.findOne({ _id: reset.userId });


        if (newPassword !== confirmNewPassword) {
            res
                .status(400)
                .json({ success: false, message: "Password do not match !" });
        }

        if (!user) {
            throw new Error('No user exists');
        }

        const hash = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id: user._id }, { $set: { password: hash } });

        await session.commitTransaction();
        res.status(201).json({ status: true, message: "Your Password reset successful" });
    } catch (err) {
        await session.abortTransaction();
        console.error(err);
        res.status(404).json({ error: err.message || 'Internal server error', success: false });
    } finally {
        session.endSession();
    }
}

//admin previleges
exports.createAdmin = async (req, res, next) => {
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
                res.status(201).json({ status: true, message: "New Admin Created Successfully !" });
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

exports.showAdmins = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // console.log('********admin controller line 647', req.adminUser)
        if (!req.adminUser.master) {
            res.status(403).json({ status: false, message: "Unauthorised User!" })
        }
        const users = await User.find({ email: { $ne: req.adminUser.email } });
        // console.log('*************Line 651 admin controller -users************', users)
        res.status(201).json({ status: true, users: users });


    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            Error: err,
        });
        console.log(err)
    } finally {
        session.endSession
    }
}

exports.getAdminInfo = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // console.log('********admin controller line 647', req.adminUser)
        if (!req.adminUser.master) {
            res.status(403).json({ status: false, message: "Unauthorised User!" })
        }
        const user = await User.find({ email: req.query.email });
        // console.log('*************Line 651 admin controller -users************', users)
        res.status(201).json({ status: true, users: user });


    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            Error: err,
        });
        console.log(err)
    } finally {
        session.endSession
    }
}

exports.editAdminInfo = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const name = req.body.Name;
        const email = req.body.Email;
        const oldEmail = req.body.oldEmail;
        const password = req.body.Password;
        console.log('*********line 699 admin controller*****', oldEmail)


        if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)) {
            return res.status(400).json({ status: false, message: 'Bad Parameter. Something is Misssing !' });
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            console.log(err);
            const x = await User.updateOne({ email: oldEmail }, { name: name, email: email, password: hash })

            await session.commitTransaction()
            res.status(201).json({ status: true, newAdminInfo: x, message: `Admin user info updated successfully !` });
        });



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

