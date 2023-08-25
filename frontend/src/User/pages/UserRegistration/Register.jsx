import React, { useState } from 'react';
import { Input } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import './Register.scss';
import logo from './logo.png';
import axios from 'axios';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const [err, setErr] = useState(null);



  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.phone_number || !formData.password) {
      setErr('Please fill in all fields.');
      return;
    }
    
    try{
      await axios.post("http://localhost:8800/api/auth/register", formData)
    } 
    catch (err){
      if (err.response.status === 400) {
        setErr(err.response.data);
      } else {
        setErr('User already exists.');
      }
    }

  };

  console.log(err);



  return (
    <div className="register-page">
      <div className="register-form-container">
        <div className="register-form-header">
          <img src= {logo} alt="KataKhane" />
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              name="full_name"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Phone Number"
              name="phone_number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {err && err}
          <div className="form-group">
            <button type="submit" className="register-btn" >Register Now</button>
          </div>
        </form>
        <div className="register-form-footer">
          Already have an account? <a href="#">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
