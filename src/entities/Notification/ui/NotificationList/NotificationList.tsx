import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './NotificationList.module.scss';
import { memo } from 'react';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/redesign/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesign/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data, isLoading } = useNotifications(null, {
        // Делаем запрос каждые 10 сек к бд
        pollingInterval: 10000,
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesign',
        on: () => SkeletonRedesign,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack
                gap="8"
                className={classNames(cls.Notification, {}, [className])}
            >
                <Skeleton width="100%" height={140} border="8px" />
                <Skeleton width="100%" height={140} border="8px" />
                <Skeleton width="100%" height={140} border="8px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="8"
            className={classNames(cls.Notification, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});
