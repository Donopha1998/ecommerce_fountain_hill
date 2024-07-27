import React, { useContext, useEffect, useState } from 'react';
import { Layout, Button, Badge } from 'antd';
import viteLogo from '/vite.svg';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './NavigationBar.css';
import { CartContext } from '../../context/cartContext';

const { Header } = Layout;

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cart, getCart } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, [getCart]);



  return (
    <Header className="header">
      <div className="logo">
      <Link to="/dashboard">
        <img src={viteLogo} alt="logo" className="logo-image" />
        </Link>
      </div>
 
      {isAuthenticated ? (
        <div className='auth-buttons'>
          {cart && cart.products?.length > 0 && (
            <Badge
              count={cart.products.reduce((acc, item) => acc + item.quantity, 0)}
              className="cart-badge"
              style={{ marginBottom: '20px' }}
            >
               <Link to="/cart">
              <Button type="primary">
                Cart
              </Button>
              </Link>
            </Badge>
          )}
         
            <Button type="primary">
            <Link to="/profile">
            Profile
            </Link>
          </Button>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login">
            <Button type="primary" icon={<LoginOutlined />} className="auth-button">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button type="primary" icon={<UserAddOutlined />} className="auth-button">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </Header>
  );
};

export default NavigationBar;
