import React from 'react';
import UserPanel from './UserRouter';
import RestaurantPanel from './RestaurantRouter';

function App() {
  const port = window.location.port;
  if (port === "3000") {
    return <UserPanel />;
  } else if (port === "5000") {
    return <RestaurantPanel />;
  } else {
    return <div>Error: Invalid port number.</div>;
  }
}

export default App;