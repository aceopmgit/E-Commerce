const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home');
const authenticateUser = require('../controllers/authenticateUser');

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
router.get('/getCart', authenticateUser.userAuthenticate, homeController.getCart);
router.post('/addToCart', authenticateUser.userAuthenticate, homeController.addToCart);
router.post('/removeFromCart', authenticateUser.userAuthenticate, homeController.removeFromCart);
router.get('/cartPayment', authenticateUser.userAuthenticate, homeController.cartPayment);
router.post("/updateTransaction", authenticateUser.userAuthenticate, homeController.updateTransaction);
router.post('/addUser', homeController.addUser);
router.post('/loginCheck', homeController.loginCheck);
router.post('/editUserInfo', authenticateUser.userAuthenticate, homeController.editUserInfo);
router.post('/resetEmail', authenticateUser.userAuthenticate, homeController.resetEmail)
router.get('/resetpassword/:id', homeController.resetpassword);
router.post('/updatepassword/:resetPasswordId', homeController.updatepassword)
router.get('/', homeController.home);



module.exports = router;

