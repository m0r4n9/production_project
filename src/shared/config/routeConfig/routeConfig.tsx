import {RouteProps} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {AboutPage} from "pages/AboutPage";
import {NotFoundPage} from "pages/NotFoundPage";
import {ProfilePage} from "pages/ProfilePage";
import {ArticlesPage} from "pages/ArticlesPage";
import {ArticleDetailsPage} from "pages/ArticleDetailsPage";
import {ArticleEditPage} from "pages/ArticleEditPage";
import {AdminPanelPage} from "pages/AdminPanelPage";
import {UserRole} from "entities/User";
import {ForbiddenPage} from "pages/ForbiddenPage";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    role?: UserRole[];
}

export  enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // Последний
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
    [AppRoutes.ARTICLE_CREATE]: '/articles/create',
    [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FORBIDDEN]: '/forbidden',
    // Последний !!!
    [AppRoutes.NOT_FOUND]: '*'
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage/>
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage/>,
        authOnly: true

    },
    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}:id`,
        element: <ArticleDetailsPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: `${RoutePath.article_create}`,
        // Можно сделать два отдельных файла, если создание сильно отличается от редактирования
        element: <ArticleEditPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: `${RoutePath.article_edit}`,
        element: <ArticleEditPage/>,
        authOnly: true
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: RoutePath.admin_panel,
        element: <AdminPanelPage/>,
        authOnly: true,
        role: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: RoutePath.forbidden,
        element: <ForbiddenPage/>,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>
    },
}
