import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
  const user = useAuth();
  // console.log('user', user)
    const auth = user.user.token;
    // console.log('auth', auth);
  
    return auth ? children : <Navigate to="/login" replace />;
  };

  export default PrivateRoute;