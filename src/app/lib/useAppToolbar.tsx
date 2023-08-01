import { AppRoutes } from '@/shared/const/router';
import { ReactElement } from 'react';
import { ScrollToolBar } from '@/widgets/ScrollToolBar';
import {useRouteChange} from "@/shared/lib/router/useRouteChange";

export function useAppToolbar() {
    const appRoute = useRouteChange();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolBar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolBar />,
    };

    return toolbarByAppRoute[appRoute]
}
