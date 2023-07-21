import {classNames} from "shared/lib/classNames/classNames";
import cls from './NotificationButton.module.scss';
import React, {memo} from 'react';
import {Button, ThemeButton} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import {NotificationList} from "entities/Notification";
import {Popover} from "shared/ui/Popups";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {className} = props;

    return (
        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            trigger={(
                <Button theme={ThemeButton.CLEAR}>
                    <Icon Svg={NotificationIcon} inverted/>
                </Button>
            )}
            direction='bottom left'
        >
            <NotificationList className={cls.notifications}/>
        </Popover>
    );
});
