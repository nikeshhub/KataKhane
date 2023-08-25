import React, { useState } from 'react';
import './notification.scss';

const NotificationSideCollapse = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-side-collapse">
      <div className="notification-side-collapse__header" onClick={handleToggle}>
        <i className="notification-side-collapse__icon fas fa-bell"></i>
        <span className="notification-side-collapse__title">Notifications</span>
        {isOpen ? <i className="notification-side-collapse__arrow fas fa-chevron-left"></i> : <i className="notification-side-collapse__arrow fas fa-chevron-right"></i>}
      </div>
      {isOpen && (
        <div className="notification-side-collapse__content">
          <ul className="notification-side-collapse__list">
            <li className="notification-side-collapse__item">
              <div className="notification-side-collapse__item-header">
                <i className="notification-side-collapse__item-icon fas fa-comment"></i>
                <span className="notification-side-collapse__item-title">New comment</span>
              </div>
              <p className="notification-side-collapse__item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <span className="notification-side-collapse__item-time">10 mins ago</span>
            </li>
            <li className="notification-side-collapse__item">
              <div className="notification-side-collapse__item-header">
                <i className="notification-side-collapse__item-icon fas fa-heart"></i>
                <span className="notification-side-collapse__item-title">New like</span>
              </div>
              <p className="notification-side-collapse__item-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <span className="notification-side-collapse__item-time">1 hour ago</span>
            </li>
            <li className="notification-side-collapse__item">
              <div className="notification-side-collapse__item-header">
                <i className="notification-side-collapse__item-icon fas fa-share"></i>
                <span className="notification-side-collapse__item-title">New share</span>
              </div>
              <p className="notification-side-collapse__item-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <span className="notification-side-collapse__item-time">3 hours ago</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationSideCollapse;
