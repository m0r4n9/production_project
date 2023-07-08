import {classNames} from "shared/lib/classNames/classNames";
import cls from './Modal.module.scss';
import React, {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import Portal from "shared/ui/Portal/Portal";
import {useTheme} from "app/providers/ThemeProvider";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_CLOSE_DELAY = 300;

export const Modal = ({className, children, isOpen, onClose, lazy}: ModalProps) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout>>();
    const {theme} = useTheme();

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_CLOSE_DELAY)
        }
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    // Новые ссылки!!!
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key == 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen])

    // Почитать
    // ESlint hooks react смотрит зависимости
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [isOpen, onKeyDown])

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div
                        className={cls.content}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
