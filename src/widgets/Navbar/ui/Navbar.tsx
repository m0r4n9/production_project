import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import {
    AppLinkTheme,
    AppLink as AppLinkDeprecated,
} from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesign/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown/ui/AvatarDropdown/AvatarDropdown';
import { getRouteArticleCreate } from '@/shared/const/router';
import {toggleFeatures, ToggleFeatures} from '@/shared/lib/features';
import {Button} from "@/shared/ui/redesign/Button";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const mainClass = toggleFeatures({
        name: 'isAppRedesign',
        on: () => cls.NavbarRedesign,
        off: () => cls.Navbar
    })

    if (authData) {
        return (
            <ToggleFeatures
                feature="isAppRedesign"
                on={
                    <header
                        className={classNames(mainClass, {}, [
                            className,
                        ])}
                    >
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(mainClass, {}, [className])}>
                        <TextDeprecated
                            title={t('SAS App')}
                            theme={TextTheme.INVERTED}
                            className={cls.appName}
                        />
                        <AppLinkDeprecated
                            to={getRouteArticleCreate()}
                            theme={AppLinkTheme.SECONDARY}
                        >
                            {t('Создать статью')}
                        </AppLinkDeprecated>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
            />
        );
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesign"
                on={
                    <Button
                        variant='clear'
                        onClick={onShowModal}
                        className={cls.links}
                    >
                        {t('Войти')}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ThemeButton.CLEAR_INVERTED}
                        onClick={onShowModal}
                        className={cls.links}
                    >
                        {t('Войти')}
                    </ButtonDeprecated>
                }
            />

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});

export default Navbar;
