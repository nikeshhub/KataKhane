import axios from 'axios';
import { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [currentRestaurant, setCurrentRestaurant] = useState(
    localStorage.getItem("restaurant")
      ? JSON.parse(localStorage.getItem("restaurant"))
      : null
  );

  const login = async (formData) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      formData,
      { withCredentials: true }
    );
    setCurrentUser(res.data);
  };

  const restaurantLogin = async (formData) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/restaurant/login",
      formData,
      { withCredentials: true }
    );
    setCurrentRestaurant(res.data);
  };

  const logout = async () => {
    setCurrentUser(null);
    setCurrentRestaurant(null);
  };

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify(currentUser) || "null"
    );
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(
      "restaurant",
      JSON.stringify(currentRestaurant) || "null"
    );
  }, [currentRestaurant]);

  return (
    <AuthContext.Provider
      value={{ currentUser, currentRestaurant, login, restaurantLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
