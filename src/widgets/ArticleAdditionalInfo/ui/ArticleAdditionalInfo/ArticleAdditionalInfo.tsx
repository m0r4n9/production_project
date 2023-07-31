import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleAdditionalInfo.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';
import { Avatar } from '@/shared/ui/redesign/Avatar';
import { Text } from '@/shared/ui/redesign/Text';
import { Button } from '@/shared/ui/redesign/Button';

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAd: string;
    views: number;
    onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const { className, author, createdAd, views, onEdit } = props;
        const { t } = useTranslation();

        return (
            <VStack
                gap="32"
                className={classNames(cls.ArticleAdditionalInfo, {}, [
                    className,
                ])}
            >
                <HStack gap='8'>
                    <Avatar src={author.avatar} size={32} />
                    <Text text={author.username} bold />
                    <Text text={createdAd} />
                </HStack>
                <Button onClick={onEdit}>{t('Редактировать')}</Button>
                <Text text={t('{{count}} просмотров', {count: views})}/>
            </VStack>
        );
    },
);

// 1 просмотр 0 просмотров 5 просмотров 2 просмотра - плюральные формы
