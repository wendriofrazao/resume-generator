import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/userAuth.jsx";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }) {
  const { user, loading} = useAuth();
  const location = useLocation();

  if(loading){ return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );}
  
  if (!user) return <Navigate to="/" replace state={{ from: location }} />;

  if (
    user.isAccountVerified !== true &&
    location.pathname !== "/auth/Account-Verification"
  ) {
    return <Navigate to="/auth/Account-Verification" replace />;
  }

 if (
    user.isAccountVerified === true &&
    location.pathname === "/auth/Account-Verification"
  ) {
    return <Navigate to="/dashboard" replace />;
  }
    
  return children;
}

 
 