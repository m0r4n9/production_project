import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Select.module.scss';
import {useTranslation} from "react-i18next"
import {ChangeEvent, memo, useCallback, useMemo} from "react";

export interface SelectOptions {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOptions[];
    value?: string;
    readonly?: boolean;
    onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        value,
        onChange,
        options,
        readonly
    } = props;
    const {t} = useTranslation();

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    const optionsList = useMemo(() => {
        return options?.map((optItem) => (
            <option
                key={optItem.value}
                className={cls.option}
                value={optItem.value}
            >
                {optItem.content}
            </option>
        ))
    }, [options])

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                disabled={readonly}
            >
                {optionsList}
            </select>
        </div>
    );
});
