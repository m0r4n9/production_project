import { classNames, Mods } from '../../../lib/classNames/classNames';
import cls from './Button.module.scss';
import React, {ButtonHTMLAttributes, FC, ForwardedRef, forwardRef, memo, ReactNode} from 'react';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    color?: ButtonColor;
    disabled?: boolean;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

// Button можно использовать с children т.к. в 99% случаев children в button - это просто строка,
// которая не будет меняться и не будет тянуть за собой сложную древовидную структуру !!!
export const Button: FC<ButtonProps> = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        className,
        variant = 'outline',
        children,
        square,
        size = 'm',
        disabled,
        color = 'normal',
        fullWidth,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
        <button
            className={classNames(cls.Button, mods, [
                className,
                cls[variant],
                cls[size],
                cls[color]
            ])}
            disabled={disabled}
            {...otherProps}
            ref={ref}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});
