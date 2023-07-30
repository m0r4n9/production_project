import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { useSelector } from 'react-redux';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {getRouteAdmin, getRouteProfile, getRouteSettings} from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesign/Popups';
import {Avatar} from "@/shared/ui/redesign/Avatar";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const isAdminPanelAvailable = isAdmin || isManager;

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    // Так как аватарка отрендериться только для авторизованных пользователей,
    // то можно вернуть нулл, если пользователь не авторизован
    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('Админка'),
                      href: getRouteAdmin(),
                  },
              ]
            : []),
        {
            content: t('Профиль'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Настройки'),
            href: getRouteSettings(),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={
                <Dropdown
                    className={classNames('', {}, [className])}
                    direction="bottom left"
                    items={items}
                    trigger={
                        <Avatar size={40} src={authData.avatar} />
                    }
                />
            }
            off={
                <DropdownDeprecated
                    className={classNames('', {}, [className])}
                    direction="bottom left"
                    items={items}
                    trigger={
                        <AvatarDeprecated inverted size={30} src={authData.avatar} />
                    }
                />
            }
        />
    );
});
