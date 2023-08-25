import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { AuthContext } from '../../../context/authContext';

import './dashboard.scss';

const ReviewDashboard = () => {
  const { currentRestaurant } = useContext(AuthContext);
  const [tab, setTab] = useState('daily');
  const [data, setData] = useState([]);
  const restaurantId = currentRestaurant.restaurant_id;
  const apiUrl = `http://localhost:8800/api/review/getReviewListByRestaurantID?review_restaurant_id=${restaurantId}&interval=${tab}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((reviews) => {
        const chartData = [
          {
            id: 'reviews',
            data: reviews.map((review) => ({
              x: review.posted_at,
              y: review.rating,
            })),
          },
        ];
        setData(chartData);
      })
      .catch((err) => console.log(err));
  }, [apiUrl, tab]);

  const handleTabChange = (tab) => {
    setTab(tab);
  };

  return (
    <div className="review-dashboard">
      <h2>Review Dashboard</h2>
      <div className="review-dashboard-tabs">
        <button
          className={`review-dashboard-tab${tab === 'daily' ? ' active' : ''}`}
          onClick={() => handleTabChange('daily')}
        >
          Daily
        </button>
        <button
          className={`review-dashboard-tab${tab === 'weekly' ? ' active' : ''}`}
          onClick={() => handleTabChange('weekly')}
        >
          Weekly
        </button>
        <button
          className={`review-dashboard-tab${tab === 'monthly' ? ' active' : ''}`}
          onClick={() => handleTabChange('monthly')}
        >
          Monthly
        </button>
      </div>
      <div className="review-dashboard-graph">
      {data && data.length > 0 ? (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'time', format: '%Y-%m-%d' }}
          xFormat="time:%Y-%m-%d"
          yScale={{ type: 'linear', min: 0, max: 5, stacked: false, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%b %d',
            tickValues: 'every 1 day',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
          }}
          axisLeft={{
            tickValues: [0, 1, 2, 3, 4, 5],
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Rating',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'category10' }}
          lineWidth={2}
          enablePoints={false}
          useMesh={true}
        />
        ) : (
          <p>No data to display.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewDashboard;
