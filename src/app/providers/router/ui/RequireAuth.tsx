import {useSelector} from "react-redux";
import {getUserAuthData, getUserRole, UserRole} from "@/entities/User";
import {Navigate, useLocation} from "react-router-dom";
import {useMemo} from "react";
import {getRouteForbidden, getRouteMain} from "@/shared/const/router";

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRole);

    const hasRequireRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some(requireRole => {
            return userRoles?.includes(requireRole);
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    if (!hasRequireRoles) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;
}
