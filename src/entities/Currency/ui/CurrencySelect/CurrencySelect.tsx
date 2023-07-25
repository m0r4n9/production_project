import {useTranslation} from "react-i18next"
import {Currency} from "../../model/types/currency";
import {memo, useCallback} from "react";
import {ListBox} from "@/shared/ui/Popups";

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
        <ListBox
            className={className}
            onChange={onChangeHandler}
            items={options}
            value={value}
            readonly={readonly}
            direction='top right'
            defaultValue={t('Укажите валюту')}
            label={t('Укажите валюту')}
        />
    )

    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('Укажите валюту')}
    //         value={value}
    //         options={options}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );
});
