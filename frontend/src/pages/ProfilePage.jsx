import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../api';
import '../components/Auth/Register/Register.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userProfile = await getUser();
        const { name: { firstName, lastName }, email } = userProfile.data.user;

        setFormData(prevState => ({
            ...prevState,
            firstName,
            lastName,
            email
          }));
          
      } catch (error) {
        notification.error({
          message: 'Error fetching profile',
          description: 'Failed to load user profile data.',
        });
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const formattedData = {
      name: {
        firstName: formData.firstName,
        lastName: formData.lastName
      },
      email: formData.email
    };

    try {
      await updateUser(formattedData);
      notification.success({
        message: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      notification.error({
        message: 'Update Failed',
        description: error.response.data.error || 'Failed to update profile.',
      });
    }
  };

  return (
    <div className="register-container">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
        >
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
