import './App.scss';
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Leftbar from './Restaurant/components/leftbar/leftbar';


import Register from './Restaurant/pages/Register/Register';
import LoginPage from './Restaurant/pages/Log In/Login';
import ForgetPasswordPage from "./User/pages/Forgot Password/forgotpassword";
import Grid from "antd/es/card/Grid";

import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import CreateEvent from './Restaurant/pages/Events/event';
import ReviewListPage from './Restaurant/pages/Reviews/Reviews';
import ReviewDashboard from './Restaurant/pages/Dashboard/dashboard';
import RestaurantMenu from './Restaurant/pages/Menu/menu';
import SettingsPage from './Restaurant/pages/Settings/settings';
import Profile from './Restaurant/pages/Restaurant Profile/restaurantProfile';




function RestaurantPanel() {
  const { currentRestaurant } = useContext(AuthContext);

  const PageLayout = () => (
    <Grid container>
      <Grid item md={4}>
        <Leftbar />
      </Grid>
      <Grid item md={8}>
        <Outlet />
      </Grid>
    </Grid>
  );

  const ProtectedRoute = ({ children }) => {
    if (!currentRestaurant) {
      return <Navigate to="/loginpage" />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <PageLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <ReviewDashboard />,
        },
        {
          path: "/event",
          element: <CreateEvent />,
        },
        {
          path: "/reviews",
          element: <ReviewListPage />,
        },
        {
          path: "/menu",
          element: <RestaurantMenu />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },

      ]
    },

    {
      path: "/registerpage",
      element: <Register />,
    },
    {
      path: "/loginpage",
      element: <LoginPage />,
    },
    



  ]);
  return (

    <RouterProvider router={router} />
  );
}

export default RestaurantPanel;
