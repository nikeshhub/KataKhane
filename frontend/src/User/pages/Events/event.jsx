import React from 'react';
import { Card } from 'antd';
import './event.scss';

const RestaurantEvent = ({ photoUrl, eventName, restaurantName, eventDate }) => {
  return (
    <div className="restaurant-event">
      <Card
        cover={
          <img
            alt="Restaurant event"
            src={photoUrl}
          />
        }
      >
        <div className="event-details">
          <h2 className="event-name">{eventName}</h2>
          <p className="restaurant-name">{restaurantName}</p>
          <p className="event-date">{eventDate}</p>
        </div>
      </Card>
    </div>
  );
};

export default RestaurantEvent;
