import {Menu} from '@headlessui/react'
import cls from './Dropdown.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {Fragment, ReactNode} from "react";
import {DropdownDirection} from "@/shared/types/ui";
import {AppLink} from "@/shared/ui/deprecated/AppLink";
import {Button} from "@/shared/ui/deprecated/Button";
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/pupup.module.scss';

export interface DropdownItems {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

export interface DropdownProps {
    className?: string;
    items: DropdownItems[];
    trigger?: ReactNode;
    direction?: DropdownDirection;
}

/**
 * @deprecated
 */
export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        items,
        trigger,
        direction = 'bottom right'
    } = props;


    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            as='div'
            className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
        >
            <Menu.Button className={popupCls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items
                className={classNames(cls.menu, {}, menuClasses)}
            >
                {items.map((item, index) => {
                    const content = ({active}: { active: boolean }) => (
                        <Button
                            type='button'
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className={classNames(cls.item, {[popupCls.active]: active}, menuClasses)}
                        >
                            {item.content}
                        </Button>
                    )

                    if (item.href) {
                        return (
                            <Menu.Item
                                key={`dropdown-key-${index}`}
                                as={AppLink}
                                disabled={item.disabled}
                                to={item.href}
                            >
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item
                            key={`dropdown-key-${index}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    );
}
