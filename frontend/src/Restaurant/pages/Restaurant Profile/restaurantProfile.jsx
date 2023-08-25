import React from 'react';
import './restaurantProfile.scss';
import logo from './logo.png';
import { StarFilled } from '@ant-design/icons';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-pic">
          <img src= {logo} alt="Profile Pic" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">Himalayan Java</h2>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-count">500</span>
              <span className="stat-title">Photos</span>
            </div>
            <div className="profile-stat">
              <span className="stat-count">1000</span>
              <span className="stat-title">Followers</span>
            </div>
            <div className="profile-stat">
              <span className="stat-count">500</span>
              <span className="stat-title">Following</span>
            </div>
          </div>
          <div className="profile-bio">
            <p>
              The best motherfucking coffee in town
            </p>
          </div>
          <div className="profile-rating">
            <StarFilled className="rating-star" />
            <StarFilled className="rating-star" />
            <StarFilled className="rating-star" />
            <StarFilled className="rating-star" />
            <StarFilled className="rating-star" />
            <span className="rating-value">4.5</span>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-tabs">
          <button className="tab-button active">Reviews</button>
          <button className="tab-button">Photos</button>
          <button className="tab-button">Menu</button>
          <button className="tab-button">Events</button>
          <button className="tab-button">Map</button>
        </div>
        <div className="profile-review">
          {/* Your review would go here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
