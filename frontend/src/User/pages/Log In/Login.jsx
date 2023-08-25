import React, { useState, useContext } from "react";
import { Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";
import logo from "./logo.png";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if ( !formData.email || !formData.password) {
      setErr('Please enter both email and password.');
      return;
    }
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-form-header">
          <img src={logo} alt="KataKhane" />
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              name="email"
              value={formData.email}
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
          <a href="#" className="forgot-password-link">
            Forgot password?
          </a>
          {err && err}
          <div className="form-group">
            <button type="submit" className="login-btn">
              Log in
            </button>
          </div>
        </form>
        <div className="login-form-footer">
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
