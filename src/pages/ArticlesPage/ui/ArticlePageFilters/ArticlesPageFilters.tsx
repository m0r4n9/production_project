import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ArticlePageFilters.module.scss';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {Card} from '@/shared/ui/deprecated/Card';
import {Input} from '@/shared/ui/deprecated/Input';
import {ArticleTypeTabs} from '@/features/ArticleTypeTabs';
import {ArticleViewSelector} from '@/features/ArticleViewSelector';
import {ArticleSortSelector} from '@/features/ArticleSortSelector';
import {useArticleFilters} from '../../lib/hooks/useArticleFilters';

interface ArticlePageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlePageFiltersProps) => {
    const {className} = props;
    const {t} = useTranslation('article-details');
    const {
        view,
        sort,
        search,
        type,
        order,
        onChangeView,
        onChangeSort,
        onChangeSearch,
        onChangeType,
        onChangeOrder
    } = useArticleFilters();

    return (
        <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView}/>
            </div>
            <Card className={cls.search}>
                <Input
                    placeholder={t('Поиск')}
                    value={search}
                    onChange={onChangeSearch}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </div>
    );
});
