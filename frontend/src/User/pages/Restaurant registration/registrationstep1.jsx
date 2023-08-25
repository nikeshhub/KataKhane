import React from 'react';
import './register.scss';

function Register1() {
  return (
    <div className="register-container">
      <h1 className="register-title">Create an account</h1>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="restaurant-name">Restaurant Name</label>
          <input type="text" id="restaurant-name" name="restaurant-name" placeholder="Enter your restaurant name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
      <p className="register-login">Already have an account? <a href="#">Log in</a></p>
    </div>
  );
}

export default Register1;
