import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const PublicRouter = ({ children }) => {
  const user = useAuth();
  // console.log('user', user)
    const auth = user.user.token;
    // console.log('auth', auth);
  
    return auth ? <Navigate to="/" replace />:children;
  };

  export default PublicRouter;