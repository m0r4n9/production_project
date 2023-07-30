import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemRedesign.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleListItemProps } from '../ArticleListItem';
import { Text } from '@/shared/ui/redesign/Text';
import { Icon } from '@/shared/ui/redesign/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '@/entities/Article/model/types/article';
import { Card } from '@/shared/ui/redesign/Card';
import { Avatar } from '@/shared/ui/redesign/Avatar';
import { AppImage } from '@/shared/ui/redesign/AppImage';
import { Skeleton } from '@/shared/ui/redesign/Skeleton';
import { AppLink } from '@/shared/ui/redesign/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesign/Button';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';

export const ArticleListItemRedesign = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation('article-details');

    const userInfo = (
        <>
            <Avatar size={32} src={article.user.avatar} />
            <Text bold text={article.user.username} />
        </>
    );

    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <Card
                padding="24"
                fullWidth
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack max gap="16">
                    <HStack gap="8" max>
                        {userInfo}
                        <Text text={article.createdAt} />
                    </HStack>
                    <Text title={article.title} bold />
                    <Text title={article.subtitle} size="s" />
                    <AppImage
                        fallback={<Skeleton width="100%" height={300} />}
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                            className={cls.textBlock}
                        />
                    )}
                    <HStack max justify="between">
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button variant="outline">
                                {`${t('Читать далее')}...`}
                            </Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <Card border="round" className={cls.card}>
                <AppImage
                    fallback={<Skeleton width="100%" height={300} />}
                    src={article.img}
                    alt={article.title}
                    className={cls.img}
                />
                <VStack gap="4" className={cls.info}>
                    <Text title={article.title} className={cls.title} />
                    <VStack max gap="4" className={cls.footer}>
                        <HStack max justify="between">
                            <Text
                                text={article.createdAt}
                                className={cls.data}
                            />
                            {views}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
