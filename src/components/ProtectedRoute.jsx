import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path based on your project structure

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the user object from AuthContext

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
