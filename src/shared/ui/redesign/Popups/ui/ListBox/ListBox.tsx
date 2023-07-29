import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesign/Button';
import { HStack } from '@/shared/ui/redesign/Stack';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem<T extends string> {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    className?: string;
    items?: ListBoxItem<T>[];
    value?: T;
    defaultValue?: string;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
    onChange: (value: T) => void;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        readonly,
        direction = 'bottom right',
        label,
        onChange,
    } = props;

    const optionsClasses = [mapDirectionClass[direction], popupCls.me];

    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    return (
        <HStack gap="4">
            {label && (
                <span
                    className={classNames(
                        '',
                        { [cls.disabledLabel]: readonly },
                        [],
                    )}
                >
                    {label + '>'}
                </span>
            )}
            <HListBox
                as="div"
                disabled={readonly}
                value={value}
                onChange={onChange}
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
            >
                <HListBox.Button as="div" className={popupCls.trigger}>
                    <Button variant="filled" disabled={readonly}>
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected, disabled }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [popupCls.active]: active,
                                            [popupCls.disabled]: disabled,
                                            [popupCls.selected]: selected,
                                        },
                                        [],
                                    )}
                                >
                                    {selected}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}
