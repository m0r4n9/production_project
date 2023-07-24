import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

export function useModal(props: UseModalProps) {
    const {
        onClose,
        isOpen,
        animationDelay
    } = props;
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay)
        }
    }, [onClose, animationDelay]);

    // Новые ссылки!!!
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key == 'Escape') {
            close();
        }
    }, [close]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

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
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close
    }
}
