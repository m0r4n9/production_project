import {Fragment, ReactNode} from 'react'
import {Listbox as HListBox} from '@headlessui/react'
import cls from './ListBox.module.scss';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {Button} from "shared/ui/Button/Button";
import {HStack} from "shared/ui/Stack/HStack/HStack";

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

type DrowDownDirection = 'top' | 'bottom';

interface ListBoxProps {
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string;
    readonly?: boolean;
    direction?: DrowDownDirection;
    label?: string;
    onChange: (value: string) => void;
}

const mapDirectionClass: Record<DrowDownDirection, string> = {
    bottom: cls.optionBottom,
    top: cls.optionTop
}

export const ListBox = (props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        readonly,
        direction = 'bottom',
        label,
        onChange
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap='4'>
            {label && <span className={classNames('', {[cls.disabledLabel]: readonly}, [])}>{label + '>'}</span>}
            <HListBox
                as='div'
                disabled={readonly}
                value={value}
                onChange={onChange}
                className={classNames(cls.ListBox, {}, [className])}
            >
                <HListBox.Button className={cls.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
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
                            {({active, selected, disabled}) => (
                                <li
                                    className={classNames(cls.item, {
                                        [cls.active]: active,
                                        [cls.disabled]: disabled
                                    }, [])}
                                >
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
}
