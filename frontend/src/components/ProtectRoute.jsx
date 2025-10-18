import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/userAuth.jsx";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();


  if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />;

  return children;
}


 /* if (user.isAccountVerified !== true && location.pathname !== "/auth/Account-Verification") {return <Navigate to="/auth/Account-Verification" replace />;}
  */
 
 