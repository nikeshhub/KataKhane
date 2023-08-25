import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./Register.scss";
import logo from "./logo.png";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    restaurant_name: "",
    email: "",
    phone_number: "",
    password: "",
    imageUrl: "",
    description: "",
  });
  const [image, setImage] = useState();

  const [err, setErr] = useState(null);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (event) => {

  };

  const handleFormSubmit = (event) => {
    // event.preventDefault();

    axios
      .post("http://localhost:8800/api/auth/restaurant/register", formData)
      // } catch (err) {
      // if (err.response.status === 400) {
      // setErr(err.response.data);
      // } else {
      // setErr('Restaurant already exists.');
      // }
      // }

      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="register-form-container">
      <h2>Basic Information</h2>
      <Form onFinish={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="restaurant_name">Restaurant Name</label>
          <Input
            prefix={<UserOutlined />}
            placeholder="Restaurant Name"
            name="restaurant_name"
            value={formData.restaurant_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="form-group">
<label htmlFor="logo">Logo</label>
<div className="form-group">
  <label htmlFor="logo">Logo</label>
  <Upload
    name="logo"
    beforeUpload={() => false}
    onChange={handleLogoUpload}
    showUploadList={false}
  >
    {formData.logo ? (
      <img src={formData.logo} alt="logo" style={{ maxWidth: '100%' }} />
    ) : (
      <div>
        <UploadOutlined />
        <div className="ant-upload-text">Upload Logo</div>
      </div>
    )}
  </Upload>
</div>

</div> */}

        <div className="form-group">
          <label for="image">Image</label>

          <Input
            type="file"
            name="imageUrl"
            id="imageUrl"
            onChange={handleImageUpload}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Input.TextArea
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default RegisterPage;
