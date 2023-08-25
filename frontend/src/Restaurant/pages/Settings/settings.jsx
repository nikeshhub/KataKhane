import React, { useState } from 'react';
import { Tabs } from 'antd';
import GeneralSettingsForm from './GeneralSettings';
import PasswordChangeForm from './PasswordChange';
import LocationSettingsForm from './LocationSettings';
import './settings.scss';

const { TabPane } = Tabs;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="settings-page">
      <h1>Restaurant Settings</h1>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="General Information" key="general">
          <GeneralSettingsForm />
        </TabPane>
        <TabPane tab="Change Password" key="password">
          <PasswordChangeForm />
        </TabPane>
        <TabPane tab="Set Location" key="location">
          <LocationSettingsForm />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
