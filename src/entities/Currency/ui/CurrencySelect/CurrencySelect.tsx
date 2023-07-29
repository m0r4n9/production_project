import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesign/Popups';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

// Данный массив мы вынесли за функцию так как он всегда одинаковый
// В таком случае ссылку на него меняться не будет
const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    const propsListBox = {
        className: className,
        onChange: onChangeHandler,
        items: options,
        value: value,
        readonly: readonly,
        direction: 'top right' as const,
        defaultValue: t('Укажите валюту'),
        label: t('Укажите валюту'),
    };

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={<ListBox {...propsListBox} />}
            off={<ListBoxDeprecated {...propsListBox} />}
        />
    );
});
