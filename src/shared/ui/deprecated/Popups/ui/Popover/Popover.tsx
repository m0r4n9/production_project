import {Popover as HPopover} from '@headlessui/react'
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Popover.module.scss';
import popupCls from '../../styles/pupup.module.scss';
import {ReactNode} from "react";
import {DropDownDirection} from "@/shared/types/ui";
import {mapDirectionClass} from "../../styles/consts";

interface PopoverProps {
    className?: string;
    trigger?: ReactNode;
    direction?: DropDownDirection;
    children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        trigger,
        direction = 'bottom right',
        children
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <HPopover.Button as={'div'} className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(cls.panel, {}, menuClasses)}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
