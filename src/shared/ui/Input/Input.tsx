import {classNames} from "shared/lib/classNames/classNames";
import cls from './Input.module.scss';
import React, {HTMLInputTypeAttribute, InputHTMLAttributes, memo, useEffect, useRef, useState} from "react";

// Исключаем value и onChange из InputHTMLAttributes<HTMLInputTypeAttribute>
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputTypeAttribute>,
    'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autoFocus,
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>();
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    }

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true);
            ref.current.focus();
        }
    }, [autoFocus])

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {
                placeholder && (
                    <div className={cls.placeholder}>
                        {`${placeholder}>`}
                    </div>
                )
            }
            <div className={cls.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                />
                {
                    isFocused && <span
                        className={cls.caret}
                        style={{
                            left: `${caretPosition * 10}px`
                        }}
                    />
                }

            </div>

        </div>
    );
});
