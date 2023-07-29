import {classNames, Mods} from "../../../lib/classNames/classNames";
import cls from "./Button.module.scss";
import {ButtonHTMLAttributes, FC, memo} from "react";

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
}

// Button можно использовать с children т.к. в 99% случаев children в button - это просто строка,
// которая не будет меняться и не будет тянуть за собой сложную древовидную структуру !!!
export const Button: FC<ButtonProps> = memo((props) => {
    const {
        className,
        variant = 'outline',
        children,
        square,
        size = 'm',
        disabled,
        fullWidth,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth
    };

    return (
        <button
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
            disabled={disabled}
            {...otherProps}>
            {children}
        </button>
    );
});
