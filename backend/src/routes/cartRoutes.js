import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addToCart, getCart, removeFromCart, updateCart } from '../controllers/cartController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', addToCart);
router.get('/', getCart);
router.patch('/',updateCart)
router.delete('/:productId', removeFromCart);

export default router;
