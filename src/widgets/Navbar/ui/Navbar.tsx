import React, {useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import {Modal} from "shared/ui/Modal/Modal";
import {useTranslation} from "react-i18next";
import Button, {ThemeButton} from "shared/ui/Button/Button";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const {t} =useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);


    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            {/*<AppLink theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.mainLink}>Главная</AppLink>*/}
            {/*<AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>О сайте</AppLink>*/}
            <Button
                theme={ThemeButton.CLEAR_INVERTED}
                onClick={onToggleModal}
                className={cls.links}
            >
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                TEST TEST TEST TEST TEST TEST
            </Modal>
        </div>
    );
};

export default Navbar;
