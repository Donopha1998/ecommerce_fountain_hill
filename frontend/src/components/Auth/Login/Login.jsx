import React from 'react';
import LoginForm from './LoginForm';
import { Divider } from 'antd';
import './LoginPage.css'; 
import { Link } from 'react-router-dom';
import config from '../../../Utils/config';

const LoginPage = () => {


  return (
    <div className="login-container">
      <LoginForm />
      <Divider>Or</Divider>
      <div className="login-link">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
