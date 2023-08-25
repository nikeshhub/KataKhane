import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import './LocationSettings.scss';
import 'leaflet/dist/leaflet.css';

const LocationSettingsForm = () => {
  const [location, setLocation] = useState({ lat: 27.7172, lng: 85.3240 });

  const handleSaveLocation = () => {
    console.log('Location saved:', location);
  };

    const pinIcon = new L.Icon({
        iconUrl: require('./pin.png'),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
        className: 'pin-icon',

      });

  return (
    <div className="location-settings-form">
      <div className="map-container-wrapper">
        <MapContainer
          center={location}
          zoom={15}
          scrollWheelZoom={true}
          className="map-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location} icon={pinIcon} draggable={true} onDragend={(e) => setLocation(e.target.getLatLng())} />
          <MapEventsSetter setLocation={setLocation} />
        </MapContainer>
      </div>
      <Button type="primary" onClick={handleSaveLocation}>
        Save Location
      </Button>
    </div>
  );
};

const MapEventsSetter = ({ setLocation }) => {
  const map = useMapEvents({
    click: (e) => {
      setLocation(e.latlng);
    },
  });
  return null;
};

export default LocationSettingsForm;

