import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './NotificationItem.module.scss';
import {memo} from 'react';
import {Notification} from "../../model/types/Notification";
import {Card, CardTheme} from "@/shared/ui/Card/Card";
import {Text} from "@/shared/ui/Text/Text";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const {className, item} = props;

    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(cls.NotificationItem, {}, [className])}
        >
            <Text title={item.title} text={item.description}/>
        </Card>
    )

    if (item.href) {
        return (
            <a
                target={'_blank'}
                href={item.href}
                className={cls.link}
            >
                {content}
            </a>
        )
    }

    return content;
});
