import React from 'react';
import { Link } from 'react-router-dom';
import './leftbar.scss';
import logo from './logo.png';
import { HomeOutlined, SearchOutlined, EditOutlined, CalendarOutlined, BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext} from '../../../context/authContext';

const Leftbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="side-nav">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Link to="/" className="nav-link"><HomeOutlined /><span>Home</span></Link>
      <Link to="/search" className="nav-link"><SearchOutlined /><span>Search</span></Link>
      <Link to="/writeareview" className="nav-link"><EditOutlined /><span>Write a Review</span></Link>
      <Link to="/events" className="nav-link"><CalendarOutlined /><span>Events</span></Link>
      <Link to="/userprofile" className="nav-link"><UserOutlined /><span>Profile</span></Link>
      <Link to="/settings" className="nav-link"><SettingOutlined /><span>Settings</span></Link>
      <Link to="/" className="nav-link" onClick={logout}><LogoutOutlined /><span>Logout</span></Link>


    </div>
  );
}

export default Leftbar;
