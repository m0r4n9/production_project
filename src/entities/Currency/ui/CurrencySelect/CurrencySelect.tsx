import {classNames} from "shared/lib/classNames/classNames";
import cls from './CurrencySelect.module.scss';
import {useTranslation} from "react-i18next"
import {Select} from "shared/ui/Select/Select";
import {Currency} from "../../model/types/currency";
import {memo, useCallback} from "react";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

// Данный массив мы вынесли за функцию так как он всегда одинаковый
// В таком случае ссылку на него меняться не будет
const options = [
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.USD, content: Currency.USD},
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly
    } = props;
    const {t} = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Укажите валюту')}
            value={value}
            options={options}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
