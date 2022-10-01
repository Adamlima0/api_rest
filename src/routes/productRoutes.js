import { Router } from 'express';
import ProductController from '../controllers/ProductControllers';

const productController = new ProductController();
const router = Router();

router.get('/products', productController.getAll)
router.get('/product/:id', productController.getProductById);
router.post('/new', productController.store);
router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProductById)

export default router;
