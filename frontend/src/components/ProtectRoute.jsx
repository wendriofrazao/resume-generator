import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/userAuth.jsx";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if(user.isAccountVerified !== true){
    return <Navigate to="/auth/Account-Verification" replace />;
  }
  
  return children;
}