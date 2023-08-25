
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Leftbar from "./User/components/leftbar/leftbar";
import WriteReview from "./User/pages/writeareview/writeareview";
import SearchRestaurantsPage from "./User/pages/Search/Search";
import RegisterPage from "./User/pages/UserRegistration/Register";
import LoginPage from "./User/pages/Log In/Login";
import ForgetPasswordPage from "./User/pages/Forgot Password/forgotpassword";
import Grid from "antd/es/card/Grid";
import EventsPage from "./User/pages/Events/events";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import Profile from "./User/pages/UserProfile/UserProfile";
import Notification from "./User/pages/notification/notification";
import Settings from "./User/pages/Settings/settings";
import Review from './User/components/Review/Review';
import HomePage from "./User/pages/Homepage/homepage";
import UploadImageForm from "./User/pages/check";

function UserPanel() {
  const {currentUser} = useContext(AuthContext);

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
    if (!currentUser) {
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
          element: <HomePage />,
        },
        {
          path: "/writeareview",
          element: <WriteReview />,
        },
        {
          path: "/search",
          element: <SearchRestaurantsPage />,
        },
        {
          path: "/events",
          element: <EventsPage />,
        },
        {
          path: "/userprofile",
          element: <Profile />,
        },
        {
          path: "/notifications",
          element: <Notification />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ]
    },

    {
      path: "/registerpage",
      element: <RegisterPage />,
    },
    {
      path: "/loginpage",
      element: <LoginPage />,
    },
    {
      path: "/forgetpasswordpage",
      element: <ForgetPasswordPage />,
    },
    {
      path: "/check",
      element: <UploadImageForm />,
    },


  ]);
  return (

    <RouterProvider router={router} />
  );
}

export default UserPanel;
