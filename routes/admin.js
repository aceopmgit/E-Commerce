const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const authenticateAdmin = require('../controllers/authenticateAdmin')

router.get('/login', adminController.adminLogin);
router.post('/loginCheck', adminController.loginCheck);
router.get('/add', adminController.add);
router.get('/edit', adminController.edit);
router.get('/delete', adminController.delete);
router.get("/deleteProduct", adminController.deleteProduct);
router.post('/addProduct', authenticateAdmin.adminAuthenticate, adminController.addProduct);
router.get('/getProduct', adminController.getProduct);
router.get('/getAllProducts', authenticateAdmin.adminAuthenticate, adminController.getAllProducts);
router.get('/editProduct', adminController.editProduct);
router.post('/updateProduct', authenticateAdmin.adminAuthenticate, adminController.updateProduct)
router.get('/', adminController.admin);


module.exports = router;

