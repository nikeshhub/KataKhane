import React from 'react';
import { Card, Carousel, Rate} from 'antd';
import { HeartOutlined, MessageOutlined, MehOutlined } from '@ant-design/icons';
import './Review.scss';

const Review = ({ profilePicture, username, date, restaurant, rating, description, photos }) => {
  return (
    <Card className="review" bodyStyle={{ padding: 0 }}>
      <div className="review-header">
        <img src={profilePicture} alt="Profile picture" />
        <div className="review-info">
          <h3 className="review-username">{username}</h3>
          <p className="review-date">{date}</p>
          <p className="review-restaurant">{restaurant}</p>
        </div>
      </div>
      <Rate disabled value={rating} />
      <p className="review-description">{description}</p>
      <div className="review-photos">

              <img src={photos} alt="Review photo" />


      </div>
     
    </Card>
  );
};

export default Review;
