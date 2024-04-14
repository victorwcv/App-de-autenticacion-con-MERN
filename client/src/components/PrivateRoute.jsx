import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// Function to create a private route component
function PrivateRoute() {
  // Get current user data from Redux store
  const { currentUser } = useSelector((state) => state.user);
  // Return Outlet if user is authenticated, otherwise navigate to sign-up page
  return currentUser ? <Outlet /> : <Navigate to="/sign-up" />;
}

// Export the PrivateRoute component
export default PrivateRoute;
