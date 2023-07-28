import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";
import {ButtonHTMLAttributes, FC, memo} from "react";

export enum ThemeButton {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outlineRed',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

/**
 * @deprecated
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
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
        theme = ThemeButton.OUTLINE,
        children,
        square,
        size = ButtonSize.M,
        disabled,
        fullWidth,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth
    };

    return (
        <button
            className={classNames(cls.Button, mods, [className])}
            disabled={disabled}
            {...otherProps}>
            {children}
        </button>
    );
});
