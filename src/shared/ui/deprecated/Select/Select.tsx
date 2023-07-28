import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Select.module.scss';
import {useTranslation} from "react-i18next"
import {ChangeEvent, useMemo} from "react";

export interface SelectOptions<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOptions<T>[];
    value?: T;
    readonly?: boolean;
    onChange?: (value: T) => void;
}

/**
 * @deprecated
 */
export const Select = <T extends string>(props: SelectProps<T>) => {
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
        onChange?.(e.target.value as T);
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
};
