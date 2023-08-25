import React, { useState, useEffect } from 'react';
import { Input, List, Card, Select, Button, Rate } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Search.scss';

const { Search } = Input;




const SearchRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 27.7172, lng: 85.3240 });
  const [mapZoom, setMapZoom] = useState(13);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    fetch('http://localhost:8800/api/restaurant/getallrestaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants data: ', error));
  }, []);

  useEffect(() => {
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mapInstance]);

  const pinIcon = new L.Icon({
    iconUrl: require('./pin.png'),
    iconSize: [50, 50],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: 'pin-icon',

  });

  const handleSearch = (value) => {
    // Filter restaurants based on search value
    setSearchValue(value);
    const filteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.restaurant_name.toLowerCase().includes(value.toLowerCase())
    );
    setRestaurants(filteredRestaurants);
    setSelectedRestaurant(null);
    setMapCenter({ lat: 27.7172, lng: 85.3240 });
  };

  const handleRestaurantSelect = (restaurant) => {
    // Update selectedRestaurant state and set map center to restaurant location
    setSelectedRestaurant(restaurant);
    setMapCenter({ lat: restaurant.lat, lng: restaurant.lng });
  };

  const handleMapInstance = (map) => {
    setMapInstance(map);
  };


  const renderRestaurantsList = () => {
    const filteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.restaurant_name.toLowerCase().includes(searchValue.toLowerCase());
    });
  
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Search placeholder="Search restaurants" value={searchValue} onChange={(e) => handleSearch(e.target.value)} />
        </div>
        {searchValue !== '' && (
          <List
            bordered
            dataSource={filteredRestaurants}
            renderItem={(restaurant) => (
              <List.Item
                onClick={() => handleRestaurantSelect(restaurant)}
                style={{ cursor: 'pointer' }}
              >
                <Card title={restaurant.restaurant_name} style={{ width: '100%' }}>
                  <p>{restaurant.description}</p>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  };
  
  
  



  const renderMap = () => {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <MapContainer center={mapCenter} zoom={mapZoom} whenCreated={handleMapInstance}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedRestaurant && (
            <Marker
              position={[selectedRestaurant.latitude, selectedRestaurant.longitude]}
              icon={pinIcon}
            >
              <Popup>
              <div>
              <img src={selectedRestaurant.logo} alt={selectedRestaurant.name} style={{ width: '200px' }}/>
              <h3>{selectedRestaurant.restaurant_name}</h3>
              <div>Rating: <Rate disabled defaultValue= '4.5' /></div>
              <p>{selectedRestaurant.description}</p>
            </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', marginLeft: '250px' }}>
      <div style={{ flex: 2, padding: '20px' }}>
        {renderRestaurantsList()}
      </div>
      <div style={{ flex: 2 }}>{renderMap()}</div>
    </div>
  );
};

export default SearchRestaurantsPage;

