import { Navigate, useLocation } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface RequireAuthProps {
    children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
    const auth = useContext(AuthContext);
    const location = useLocation();

    if (auth?.authenticated === null) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner size={64} />
            </div>
        );
    }

    if (!auth?.authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
