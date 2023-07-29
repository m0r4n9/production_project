import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import {
    AppLinkTheme,
    AppLink as AppLinkDeprecated,
} from '@/shared/ui/deprecated/AppLink';
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesign/AppLink';
import {Icon} from "@/shared/ui/redesign/Icon";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
    authOnly?: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={
                <AppLink
                    variant="primary"
                    to={item.path}
                    activeClassName={cls.active}
                    className={classNames(cls.itemRedesign, {
                        [cls.collapsedRedesign]: collapsed,
                    })}
                >
                    <Icon Svg={item.Icon}/>
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLink>
            }
            off={
                <AppLinkDeprecated
                    theme={AppLinkTheme.SECONDARY}
                    to={item.path}
                    className={classNames(cls.item, {
                        [cls.collapsed]: collapsed,
                    })}
                >
                    <item.Icon className={cls.icon} />
                    <span className={cls.link}>{t(item.text)}</span>
                </AppLinkDeprecated>
            }
        />
    );
});
