import { useEffect, useState } from 'react';
import React from 'react';
import Review from '../../components/Review/Review';
import axios from 'axios';
import './homepage.scss';



const restaurants = [
  {
    id: 1,
    name: 'The Cheese Pasal',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366383/samples/food/fish-vegetables.jpg',
    location: 'Narayantar< Jorpati',
    rating: 4.5,
    description: 'A must-visit restaurant for cheesecake lovers!',
  },
  {
    id: 2,
    name: 'Binus Laphing',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366383/samples/food/fish-vegetables.jpg',
    location: 'Pimbahal Lalitpur',
    rating: 4.9,
    description: 'Experience the best sushi in town!',
  },
  {
    id: 2,
    name: 'Kanchi ko Bhatti',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366383/samples/food/fish-vegetables.jpg',
    location: 'Patan, Lalitpur',
    rating: 4.9,
    description: 'Experience the best sushi in town!',
  },
  {
    id: 2,
    name: 'Trisara Restaurant',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366383/samples/food/fish-vegetables.jpg',
    location: 'Lazimpat, Kathmandu',
    rating: 4.9,
    description: 'Experience the best sushi in town!',
  },
  {
    id: 2,
    name: 'Flavors Restaurant and Bar',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366383/samples/food/fish-vegetables.jpg',
    location: 'Bouddha Kathmandu',
    rating: 4.9,
    description: 'Experience the best sushi in town!',
  },
  // add more restaurants here
];

const users = [
  {
    id: 1,
    name: 'Denisha Sapkota',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366384/samples/people/smiling-man.jpg',
    points: 100,
  },
  {
    id: 2,
    name: 'Unique Siwakoti',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366386/samples/people/boy-snow-hoodie.jpg',
    points: 75,
  },
  {
    id: 3,
    name: 'Bigyan Gautam',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366386/samples/people/boy-snow-hoodie.jpg',
    points: 75,
  },
  {
    id: 4,
    name: 'Rakshya Dhakal',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366386/samples/people/boy-snow-hoodie.jpg',
    points: 75,
  },
  {
    id: 5,
    name: 'Nikesh Sapkota',
    image: 'https://res.cloudinary.com/djbvrandg/image/upload/v1678366386/samples/people/boy-snow-hoodie.jpg',
    points: 75,
  },
  // add more users here
];

const RightBar = () => {
  return (
    <div className="rightbar">
      <div className="rightbar-section">
        <h2>Favourite Restaurants</h2>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-item">
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rightbar-section">
        <h2>Top Users</h2>
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <img src={user.image} alt={user.name} />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>Points: {user.points}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const ReviewFeed = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/api/review/getReviewfeed')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div className="review-feed">
      {reviews.map((review) => (
        <div key={review.review_id} className="review-feed-item">
          <Review
            profilePicture={review.profile_picture}
            username={review.full_name}
            date={review.posted_at}
            restaurant={review.restaurant_name}
            description={review.review_text}
            photos={review.image}
          />
        </div>
      ))}
    </div>
    
  );
};

const HomePage = () => {
  return(
    <div style={{ display: 'flex', height: '100vh'}}>
    <div >
      <ReviewFeed/>
    </div>
    <div><RightBar/></div>
  </div>
  );
}

export default HomePage;
