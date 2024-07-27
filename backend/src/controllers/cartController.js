import { sendErrorResponse } from '../helpers/errorResponse.js';
import Cart from '../models/cartModel.js';

export const addToCart = async (req, res) => {
  const { product, quantity } = req.body;

  if (!product || !quantity) {
    return sendErrorResponse(res, 400, 'Product and quantity are required.');
  }

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      const existingProduct = cart.products.find(item => item.product.toString() === product._id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: product._id, quantity });
      }

      await cart.save();
    } else {
      cart = new Cart({
        user: req.user.id,
        products: [{ product: product._id, quantity }],
      });
      await cart.save();
    }

    res.json({ cart });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');

    if (!cart) {
      return sendErrorResponse(res, 404, 'Cart not found');
    }

    res.json({ cart });
  } catch (error) {
    console.log(error,'error')
    sendErrorResponse(res, 500, 'Internal server error');
  }
};

export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return sendErrorResponse(res, 400, 'Product ID and quantity are required.');
  }

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return sendErrorResponse(res, 404, 'Cart not found');
    }

    const productToUpdate = cart.products.find(item => item.product.toString() === productId);

    if (!productToUpdate) {
      return sendErrorResponse(res, 404, 'Product not found in cart');
    }

    productToUpdate.quantity = quantity;
    await cart.save();

    res.json({ cart });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
};
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return sendErrorResponse(res, 400, 'Product ID is required.');
  }

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return sendErrorResponse(res, 404, 'Cart not found');
    }

    const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

    if (productIndex === -1) {
      return sendErrorResponse(res, 404, 'Product not found in cart');
    }

    cart.products.splice(productIndex, 1);
    await cart.save();

    res.json({ cart });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
}
