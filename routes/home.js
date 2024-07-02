const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home');

router.get('/men', homeController.men);
router.get('/women', homeController.women);
router.get('/kids', homeController.kids);
router.get('/getProduct', homeController.getProduct);
router.get('/getMenProducts', homeController.getMenProducts);
router.get('/getFeaturedProducts', homeController.getFeaturedProducts);
router.get('/getWomenProducts', homeController.getWomenProducts);
router.get('/getKidsProducts', homeController.getKidsProducts);
router.get('/viewProduct', homeController.viewProduct);
router.get('/cart', homeController.cart);
router.post('/addToCart', homeController.addToCart);
router.post('/addUser', homeController.addUser);
router.post('/loginCheck', homeController.loginCheck);
router.get('/', homeController.home);



module.exports = router;

