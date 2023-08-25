import { createBrowserRouter, RouterProvider, Outlet,Navigate } from "react-router-dom";
import { useContext }from "react";
import { AuthContext } from "../components/context/authContext";
import Home from "../pages/Home";
import Register from "../pages/Register";
import About from "../pages/About";
import Listing from "../pages/Listing";
import Details from "../pages/Details";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Packages from "../pages/Packages";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ForgotPassword from "../pages/FogetPassword";
import BlogPage from "../pages/BlogPage";
import TestimonialPage from "../pages/TestomonialPage";
import Login from "../pages/Login";

// Higher-order component for protected routes
const Routers = () => {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

const Layout = () => {
  
  return (
    <Fragment>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};


  const router = createBrowserRouter([
    {
      path:"/",
      element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Listing />,
      },
      {
        path: "/products/:slug",
        element: <Details />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/ForgetPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/blogs/:slug",
        element: <BlogDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      
      {
        path: "/PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/BlogPage",
        element: <BlogPage />,
      },
      {
        path: "/TestomonialPage",
        element: <TestimonialPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Routers;