import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import './settings.scss';

const Settings = () => {
  const { currentUser } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('edit-info');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };


  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSaveChanges = () => {
    // Save changes to backend API
  };

  const handleSavePassword = () => {
    // Save new password to backend API
  };

  return (
    <div className="settings">
      <div className="settings-tabs">
        <div className={`settings-tab ${activeTab === 'edit-info' ? 'active' : ''}`} onClick={() => handleTabClick('edit-info')}>
          Edit Info
        </div>
        <div className={`settings-tab ${activeTab === 'change-password' ? 'active' : ''}`} onClick={() => handleTabClick('change-password')}>
          Change Password
        </div>
      </div>
      <div className="settings-content">
        {activeTab === 'edit-info' && (
          <div className="edit-info">
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={currentUser.full_name} onChange={handleNameChange} />
            </div>
            <div className="form-row">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" value={bio} onChange={handleBioChange}></textarea>
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" value={currentUser.phone_number} onChange={handlePhoneNumberChange} />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={currentUser.email} onChange={handleEmailChange} />
            </div>
            <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        )}
        {activeTab === 'change-password'
        && (
            <div className="change-password">
            <div className="form-row">
            <label htmlFor="current-password">Current Password</label>
            <input type="password" id="current-password" value={currentPassword} onChange={handleCurrentPasswordChange} />
            </div>
            <div className="form-row">
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" value={newPassword} onChange={handleNewPasswordChange} />
            </div>
            <div className="form-row">
            <label htmlFor="confirm-new-password">Confirm New Password</label>
            <input type="password" id="confirm-new-password" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
            </div>
            <button className="save-button" onClick={handleSavePassword}>Save Password</button>
            </div>
            )}
            </div>
            </div>
            );
            };
            
            export default Settings;
