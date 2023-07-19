import {classNames} from "shared/lib/classNames/classNames";
import cls from './CurrencySelect.module.scss';
import {useTranslation} from "react-i18next"
import {Select} from "shared/ui/Select/Select";
import {memo, useCallback} from "react";
import {Country} from "../../model/types/country";
import {ListBox} from "shared/ui/ListBox/ListBox";

interface CurrencySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

// Данный массив мы вынесли за функцию так как он всегда одинаковый
// В таком случае ссылку на него меняться не будет
const options = [
    {value: Country.Russia, content: Country.Russia},
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Kazakhstan, content: Country.Kazakhstan},
]

export const CountrySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly
    } = props;
    const {t} = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    }, [onChange]);

    return (
        <ListBox
            onChange={onChangeHandler}
            items={options}
            value={value}
            defaultValue={t('Укажите страну')}
            label={t('Укажите страну')}
            readonly={readonly}
            direction='top'
            className={className}
        />
    )

    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('Укажите страну')}
    //         value={value}
    //         options={options}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );
});
