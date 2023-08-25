import React, { useEffect, useState } from 'react';
import './event.scss';
import axios from 'axios';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/api/event/geteventlist')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <input type="text" placeholder="Search events" />
      </div>

      <div className="events-list">
        {events.map(event => (
          <div className="event" key={event.event_name}>
            <div className="event-image">
              <img src={event.imageUrl} alt="Event" />
            </div>
            <div className="event-details">
              <h2 className="event-title">{event.event_name}</h2>
              <div className="event-info">
                <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                <span className="event-time">{event.time}</span>
              </div>
              <div className="event-restaurant">
                <img src={event.logo} alt="Restaurant" />
                <span>{event.restaurant_name}</span>
              </div>
              <p className="event-description">{event.description}</p>
              <button className="event-button">RSVP</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
