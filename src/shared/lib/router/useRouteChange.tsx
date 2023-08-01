import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRouteByPathPatters, AppRoutes } from '@/shared/const/router';

export function useRouteChange() {
    const location = useLocation();
    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

    useEffect(() => {
        Object.entries(AppRouteByPathPatters).forEach(([pattern, route]) => {
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route);
            }
        });
    }, [location.pathname]);

    return appRoute;
}
