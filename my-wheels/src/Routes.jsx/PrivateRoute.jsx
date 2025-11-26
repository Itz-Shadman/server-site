import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Pages/AuthProvider";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-white text-center">Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
