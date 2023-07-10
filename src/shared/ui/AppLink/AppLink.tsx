import {FC, memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './AppLink.module.scss';
import {Link, LinkProps} from "react-router-dom";

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

// Здесь история как с кнопкой !!!
export const AppLink: FC<AppLinkProps> = memo((props) => {
    const {to, className, children, theme = AppLinkTheme.PRIMARY} = props;

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    );
});

export default AppLink;
