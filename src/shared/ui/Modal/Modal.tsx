import {classNames, Mods} from "../../lib/classNames/classNames";
import cls from './Modal.module.scss';
import React, {ReactNode} from "react";
import Portal from "../Portal/Portal";
import {useTheme} from "@/app/providers/ThemeProvider";
import {Overlay} from "../Overlay/Overlay";
import {useModal} from "../../lib/hooks/useModal/useModal";


interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}


export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy
    } = props;
    const {theme} = useTheme();
    const {
        close,
        isClosing,
        isMounted
    } = useModal({
        animationDelay: 300,
        onClose,
        isOpen
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
