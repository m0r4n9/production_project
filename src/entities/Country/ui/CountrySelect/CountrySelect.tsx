import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Country } from '../../model/types/country';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures } from '@/shared/lib/features';
import {ListBox} from "@/shared/ui/redesign/Popups";

interface CurrencySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

// Данный массив мы вынесли за функцию так как он всегда одинаковый
// В таком случае ссылку на него меняться не будет
const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo((props: CurrencySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
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
            on={
                <ListBox
                    {...propsListBox}
                />
            }
            off={
                <ListBoxDeprecated
                    {...propsListBox}
                />
            }
        />
    );
});
