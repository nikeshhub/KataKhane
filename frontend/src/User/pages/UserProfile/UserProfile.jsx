import React from 'react';
import './UserProfile.scss';
import logo from './logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-pic">
          <img src= 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366384/samples/people/smiling-man.jpg' alt="Profile Pic" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{currentUser.full_name}</h2>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-count">500</span>
              <span className="stat-title">Reviews</span>
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
              Kata khane ho ta?
            </p>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-tabs">
          <button className="tab-button active">Reviews</button>
          <button className="tab-button">Photos</button>
          <button className="tab-button">Saved</button>
        </div>
        <div className="profile-review">
          {/* Your review would go here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
