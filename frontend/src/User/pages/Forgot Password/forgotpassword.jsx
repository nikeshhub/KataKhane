import React, { useState } from 'react';
import { Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import './forgotpassword.scss';
import logo from './logo.png';

const ForgetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="forget-password-page">
      <div className="forget-password-form-container">
        <div className="forget-password-form-header">
          <img src={logo} alt="KataKhane" />
        </div>
        <div className="forget-password-form-content">
          <h2>Find Your Account</h2>
          <p>Enter your email address or phone number associated with your account.</p>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <Input
                prefix={<MailOutlined />}
                placeholder="Email or Phone Number"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
        <div className="forget-password-form-footer">
          <a href="#">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
