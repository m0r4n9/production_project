import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './NotificationButton.module.scss';
import React, {memo, useCallback, useState} from 'react';
import {Button, ThemeButton} from "@/shared/ui/deprecated/Button";
import {Icon} from "@/shared/ui/deprecated/Icon";
import {NotificationList} from "@/entities/Notification";
import {Popover} from "@/shared/ui/deprecated/Popups";
import NotificationIcon from "@/shared/assets/icons/notification-20-20.svg";
import {Drawer} from "@/shared/ui/deprecated/Drawer";
import {BrowserView, MobileView} from "react-device-detect";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {className} = props;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        (
            <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
                <Icon Svg={NotificationIcon} inverted/>
            </Button>
        )
    )

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(cls.NotificationButton, {}, [className])}
                    trigger={trigger}
                    direction='bottom left'
                >
                    <NotificationList className={cls.notifications}/>
                </Popover>
            </BrowserView>

            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList/>
                </Drawer>
            </MobileView>
        </div>
    );
});
