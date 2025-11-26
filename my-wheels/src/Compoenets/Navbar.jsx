import React, { useContext, useState } from "react";
import { NavLink } from "react-router"; // use react-router-dom, not "react-router"
import { AuthContext } from "../Pages/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // match the context function name
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut(); // ensure async handling
      setOpen(false);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-xl sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">

        {/* Logo */}
        <span className="text-3xl font-extrabold text-yellow-500">
          Rent<span className="text-white">Car</span>
        </span>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 text-white items-center">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/add-car">Add Car</NavLink></li>
          <li><NavLink to="/my-listings">My Listings</NavLink></li>
          <li><NavLink to="/my-bookings">My Bookings</NavLink></li>
          <li><NavLink to="/browse-cars">Browse Cars</NavLink></li>

          {!user && (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/signup">SignUp</NavLink></li>
            </>
          )}

          {user && (
            <div className="relative">
              <img
                src={user.photoURL || "/default-avatar.png"}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-400"
                onClick={() => setOpen(!open)}
                alt="User Avatar"
              />

              {open && (
                <div className="absolute right-0 bg-gray-900 text-white p-4 mt-2 w-48 rounded shadow">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-400 mb-2">{user.email}</p>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white w-full py-1 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
