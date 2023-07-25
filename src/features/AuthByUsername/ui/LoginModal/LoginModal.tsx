import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './LoginModal.module.scss';
import {Modal} from "@/shared/ui/Modal";
import {Suspense} from "react";
import {Loader} from "@/shared/ui/Loader";
import {LoginFormAsync} from "../LoginForm/LoginForm.async";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({className, isOpen, onClose}: LoginModalProps) => {


    return (
        <Modal
            className={classNames(cls.LoginModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loader/>}>
                <LoginFormAsync onSuccess={onClose}/>
            </Suspense>
        </Modal>
    );
};
