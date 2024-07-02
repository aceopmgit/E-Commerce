const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AdminUser = require('../models/AdminUser');
const Product = require('../models/Product');
const User = require("../models/User");


const { men, women, kids, featured } = require('../public/extras/products');

exports.home = (req, res, next) => {
    ProductCheck();
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'home.html'));
}
exports.men = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'men.html'));
}
exports.women = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'women.html'));
}

exports.kids = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'kids.html'));
}

exports.viewProduct = (req, res, next) => {

    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'viewProduct.html'));
}

exports.cart = (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", 'shop', 'cart.html'));
}

async function ProductCheck() {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const allproducts = await Product.find();

        if (allproducts.length === 0) {
            const master = await AdminUser.findOne({ email: 'master@gmail.com' });
            let a = men.map(async (x) => {
                let product = new Product({
                    title: x.title,
                    price: x.price,
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
                    price: x.price,
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
                    price: x.price,
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
                    price: x.price,
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

            console.log('*************************PRODUCT************', w, x, y, z);
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

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, name: name, }, process.env.TOKEN_SECRET);
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
                        token: generateAccessToken(loginDetail._id, loginDetail.name),
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

exports.addToCart = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const id = req.query.id;
        const quantity = req.query.quantity || 1;




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
