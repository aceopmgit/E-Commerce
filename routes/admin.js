const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const authenticateAdmin = require('../controllers/authenticateAdmin')

router.get('/login', adminController.adminLogin);
router.post('/loginCheck', adminController.loginCheck);
router.get('/forgotPasswordPage', adminController.forgotPasswordPage)
router.post('/resetEmail', adminController.resetEmail);
router.get('/resetpassword/:id', adminController.resetpassword);
router.post('/updatepassword/:resetPasswordId', adminController.updatepassword);

router.get('/add', adminController.add);
router.get('/edit', adminController.edit);
router.get('/delete', adminController.delete);

router.get("/deleteProduct", authenticateAdmin.adminAuthenticate, adminController.deleteProduct);
router.post('/addProduct', authenticateAdmin.adminAuthenticate, adminController.addProduct);
router.get('/getProduct', adminController.getProduct);
router.get('/getAllProducts', authenticateAdmin.adminAuthenticate, adminController.getAllProducts);
router.get('/editProduct', adminController.editProduct);
router.post('/updateProduct', authenticateAdmin.adminAuthenticate, adminController.updateProduct)
router.get('/', adminController.admin);

router.post('/createAdmin', authenticateAdmin.adminAuthenticate, adminController.createAdmin);
router.get('/showAdmins', authenticateAdmin.adminAuthenticate, adminController.showAdmins);
router.get('/getAdminInfo', authenticateAdmin.adminAuthenticate, adminController.getAdminInfo);
router.post('/editAdminInfo', authenticateAdmin.adminAuthenticate, adminController.editAdminInfo);
module.exports = router;

