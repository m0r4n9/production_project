import {Fragment, ReactNode} from 'react'
import {Listbox as HListBox} from '@headlessui/react'
import cls from './ListBox.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {Button} from "@/shared/ui/deprecated/Button";
import {HStack} from "@/shared/ui/redesign/Stack";
import {DropdownDirection} from "@/shared/types/ui";
import {mapDirectionClass} from "../../styles/consts";
import popupCls from '../../styles/pupup.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
    onChange: (value: string) => void;
}

/**
 * @deprecated
 */
export const ListBox = (props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        readonly,
        direction = 'bottom right',
        label,
        onChange
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap='4'>
            {label
                && <span
                    className={classNames('', {[cls.disabledLabel]: readonly}, [])}
                >{label + '>'}
            </span>
            }
            <HListBox
                as='div'
                disabled={readonly}
                value={value}
                onChange={onChange}
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
            >
                <HListBox.Button as='div' className={popupCls.trigger}>
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
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: disabled
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
