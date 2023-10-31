const express = require('express');
const { authTokenMiddleware } = require('../../../middlewares/auth');
const { getCustomersController,storeProductController,getProductsController,deleteProductController } = require('../../../controllers/admin');
const router = express.Router();

router.get('/dashboard/customers', authTokenMiddleware, getCustomersController);    
router.get('/dashboard/products', authTokenMiddleware, getProductsController);
router.post('/dashboard/product/create', authTokenMiddleware, storeProductController);
router.post('/dashboard/product/:productId', authTokenMiddleware, deleteProductController);








module.exports = router;
