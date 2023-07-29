import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { Input } from '@/shared/ui/redesign/Input';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { VStack } from '@/shared/ui/redesign/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { Card } from '@/shared/ui/redesign/Card';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesign/Icon';

interface ArticlesFiltersProps {
    className?: string;
    search: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    onChangeSearch: (value: string) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        sort,
        onChangeSort,
        onChangeOrder,
        order,
        onChangeSearch,
        search,
        type,
        onChangeType,
    } = props;
    const { t } = useTranslation('article-details');

    return (
        <Card
            padding="24"
            className={classNames(cls.ArticlesFilters, {}, [className])}
        >
            <VStack gap="32">
                <Input
                    placeholder={t('Поиск')}
                    value={search}
                    addonLeft={<Icon Svg={SearchIcon} />}
                    onChange={onChangeSearch}
                />
                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
            </VStack>
        </Card>
    );
});
