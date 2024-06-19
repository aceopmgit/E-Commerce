const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const User = require('../models/AdminUser');
const Product = require('../models/Product');

exports.admin = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'admin.html'));
}

exports.adminLogin = (req, res, next) => {
    masterCheck();
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'admin', 'admin-login.html'));
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
// masterCheck();


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
            price: price,
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
        let limit = 8;
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
        const { title, color, price, image, category } = req.body;
        const date = new Date()
        await Product.updateOne({ _id: id }, { $set: { title: title, price: price, category: category, image: image, color: color, edited: true, editedBy: req.adminUser._id, editDate: date } });
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
