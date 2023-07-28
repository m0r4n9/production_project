import cls from './SidebarItem.module.scss';
import {useTranslation} from "react-i18next"
import {AppLinkTheme, AppLink} from "@/shared/ui/deprecated/AppLink";
import React, {memo} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {getUserAuthData} from "@/entities/User";
import { useSelector } from 'react-redux';
import {SidebarItemType} from "@/widgets/Sidebar/model/types/sidebar";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
    authOnly?: boolean;
}

export const SidebarItem = memo(({item, collapsed}: SidebarItemProps) => {
    const {t} = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, {[cls.collapsed]: collapsed})}
        >
            <item.Icon className={cls.icon}/>
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>
    );
});
