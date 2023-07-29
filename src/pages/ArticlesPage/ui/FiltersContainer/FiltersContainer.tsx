import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '@/pages/ArticlesPage/lib/hooks/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        sort,
        search,
        type,
        order,
        onChangeSort,
        onChangeSearch,
        onChangeType,
        onChangeOrder,
    } = useArticleFilters();

    return (
        <ArticlesFilters
            type={type}
            sort={sort}
            search={search}
            order={order}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            onChangeType={onChangeType}
            onChangeOrder={onChangeOrder}
            className={className}
        />
    );
});
