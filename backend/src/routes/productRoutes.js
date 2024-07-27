import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();
 
router.use(authMiddleware);

router.get('/', getProducts);

export default router;
