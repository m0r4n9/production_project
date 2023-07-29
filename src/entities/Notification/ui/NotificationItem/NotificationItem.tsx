import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { memo } from 'react';
import { Notification } from '../../model/types/Notification';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import {Card} from "@/shared/ui/redesign/Card";
import {Text} from "@/shared/ui/redesign/Text";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <ToggleFeatures
            feature="isAppRedesign"
            on={
                <Card
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <Text title={item.title} text={item.description} />
                </Card>
            }
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <TextDeprecated title={item.title} text={item.description} />
                </CardDeprecated>
            }
        />
    );

    if (item.href) {
        return (
            <a target={'_blank'} href={item.href} className={cls.link}>
                {content}
            </a>
        );
    }

    return content;
});
