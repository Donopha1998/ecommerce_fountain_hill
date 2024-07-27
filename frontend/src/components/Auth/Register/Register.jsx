import React from 'react';
import RegisterForm from './RegisterForm';
import './Register.css'; 
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import config from '../../../Utils/config';

const Register = () => {
 

  return (
    <div className="register-container">
      <RegisterForm />
      <Divider>Or</Divider>
      <div className="register-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
