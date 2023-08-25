import React from 'react';
import { NavLink } from 'react-router-dom';
import './leftbar.scss';
import logo from './logo.png';
import { DashboardOutlined, EditOutlined, CalendarOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext, useAuth } from '../../../context/authContext';

const Leftbar = () => {
  const { currentRestaurant } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  return (
    <div className="side-nav">
      <div className="logo">
        <img src={currentRestaurant.logo} alt="logo" />
      </div>
      <NavLink exact to="/" className="nav-link" activeClassName="active">
        <span className="icon"><DashboardOutlined /></span>
        <span className="text">Dashboard</span>
      </NavLink>
      <NavLink to="/reviews" className="nav-link" activeClassName="active">
        <span className="icon"><EditOutlined /></span>
        <span className="text">Reviews</span>
      </NavLink>
      <NavLink to="/menu" className="nav-link" activeClassName="active">
        <span className="icon"><DashboardOutlined /></span>
        <span className="text">Menu</span>
      </NavLink>
      <NavLink to="/event" className="nav-link" activeClassName="active">
        <span className="icon"><CalendarOutlined /></span>
        <span className="text">Events</span>
      </NavLink>
      <NavLink to="/profile" className="nav-link" activeClassName="active">
        <span className="icon"><UserOutlined /></span>
        <span className="text">Profile</span>
      </NavLink>
      <NavLink to="/settings" className="nav-link" activeClassName="active">
        <span className="icon"><SettingOutlined /></span>
        <span className="text">Settings</span>
      </NavLink>
      <NavLink to="/" className="nav-link" onClick={logout}>
        <span className="icon"><LogoutOutlined /></span>
        <span className="text">Logout</span>
      </NavLink>
    </div>
  );
}
export default Leftbar;