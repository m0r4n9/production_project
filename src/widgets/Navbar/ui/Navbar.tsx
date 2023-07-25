import React, {memo, useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import {useTranslation} from "react-i18next";
import {Button, ThemeButton} from "shared/ui/Button/Button";
import {LoginModal} from "features/AuthByUsername";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {Text, TextTheme} from "shared/ui/Text/Text";
import AppLink, {AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {HStack} from "shared/ui/Stack/HStack/HStack";
import {NotificationButton} from "features/notificationButton";
import {AvatarDropdown} from "features/avatarDropdown/ui/AvatarDropdown/AvatarDropdown";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({className}: NavbarProps) => {
    const {t} = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);



    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);


    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    title={t('SAS App')}
                    theme={TextTheme.INVERTED}
                    className={cls.appName}
                />
                <AppLink
                    to={RoutePath.article_create}
                    theme={AppLinkTheme.SECONDARY}
                >
                    {t('Создать статью')}
                </AppLink>
                <HStack gap='16' className={cls.actions}>
                    <NotificationButton/>
                    <AvatarDropdown/>
                </HStack>
            </header>
        )
    }


    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ThemeButton.CLEAR_INVERTED}
                onClick={onShowModal}
                className={cls.links}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    );
});

export default Navbar;
