import { sendErrorResponse } from '../helpers/errorResponse.js';
import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  const { name, page = 1, limit = 10 } = req.query;

  try {
    const query = name ? { name: { $regex: name, $options: 'i' } } : {};
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const products = await Product.find(query).skip((page-1)*limit).limit(limit).lean()

    res.json({
      products: products,
    });
  } catch (error) {
    console.log(error)
    sendErrorResponse(res, 500, 'Internal server error');
  }
};

