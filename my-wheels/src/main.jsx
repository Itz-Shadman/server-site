import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router"; // ✅ react-router-dom
import Root from "./Root/Root.jsx";
import Home from "./Pages/Home.jsx";
import AddCar from "./Pages/AddCar.jsx";
import MyListings from "./Pages/MyListings.jsx";
import MyBookings from "./Pages/MyBookings.jsx";
import BrowseCars from "./Pages/BrowseCars.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Compoenets/NotFound.jsx"
// import AuthProvider, { AuthContext } from "./Pages/AuthProvider.jsx";

import PrivateRoute from "./Routes.jsx/PrivateRoute.jsx";
import { useContext } from "react";
import "./index.css";
import CarDetails from "./Compoenets/CarDetails.jsx";
import AuthProvider, { AuthContext } from "./Pages/AuthProvider.jsx";
import Signup from "./Pages/Signup.jsx";


// Wrappers to pass userEmail from AuthContext
const MyBookingsWrapper = () => {
  const { user } = useContext(AuthContext);
  return <MyBookings userEmail={user?.email} />;
};

const BrowseCarsWrapper = () => {
  const { user } = useContext(AuthContext);
  return <BrowseCars userEmail={user?.email} />;
};

const CarDetailsWrapper = () => {
  const { user } = useContext(AuthContext);
  return <CarDetails userEmail={user?.email} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "add-car", element: <PrivateRoute><AddCar /></PrivateRoute> },
      { path: "my-listings", element: <PrivateRoute><MyListings /></PrivateRoute> },
      { path: "my-bookings", element: <PrivateRoute><MyBookingsWrapper /></PrivateRoute> },
      { path: "browse-cars", element: <BrowseCarsWrapper /> },
      { path: "cars/:id", element: <CarDetails /> }, // ✅ detail page
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
