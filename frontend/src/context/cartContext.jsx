import React, { createContext, useCallback, useState } from 'react';
import { addCart, getCartList, updateToCart, removeCart } from '../api';
import { notification } from 'antd';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });

  const addToCart = async (product, quantity) => {
    try {
      const response = await addCart({ product, quantity });
      setCart(response.data.cart);
     
    } catch (error) {
   
    }
  };

  const getCart =async () => {
    try {
      const response = await getCartList();
      setCart(response.data.cart);
    } catch (error) {
   
    }
  }

  const updateCart = async (productId, quantity) => {
    try {
      const response = await updateToCart({ productId, quantity });
      setCart(response.data.cart);
    
    } catch (error) {
 
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await removeCart(productId);
      setCart(response.data.cart);
    
    } catch (error) {
  
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
