import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, InputNumber, Space, Typography, Image } from 'antd';
import { getProducts } from '../../api';
import { CartContext } from '../../context/cartContext';

const { Title } = Typography;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1); 
  const { cart, addToCart, getCart, updateCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products);
      } catch (error) {
   
    
      }
    };

    fetchProducts();
    getCart(); 
  }, []); 

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = (product) => {
    addToCart(product, quantity);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        className="product-list"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}
      >
        {products.map((product) => (
          <Card
            key={product._id}
            title={product.name}
            cover={<Image alt={product.name} src={product.image} height={300} style={{ border: '1px solid black' }} />}
            style={{ width: 300 }}
          >
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Space>
              <InputNumber
                min={1}
                defaultValue={1}
                onChange={handleQuantityChange}
                style={{ width: '100px' }}
              />
              <Button type="primary" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </Space>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
