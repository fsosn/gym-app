import { Navigate, useLocation } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
