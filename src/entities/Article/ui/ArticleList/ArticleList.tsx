import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleList.module.scss';
import {useTranslation} from "react-i18next"
import {HTMLAttributeAnchorTarget, memo} from 'react';
import {Article, ArticleView} from "../../model/types/article";
import {ArticleListItem} from "../ArticleListItem/ArticleListItem";
import {ArticleListItemSkeleton} from "../ArticleListItem/ArticleListItemSkeleton";
import {Text, TextSize} from "shared/ui/Text/Text";
import {List, ListRowProps, WindowScroller} from "react-virtualized";
import {PAGE_ID} from "widgets/Page/ui/Page";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view}/>
        ))
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target
    } = props;
    const {t} = useTranslation('article-details');

    const isBig = view === ArticleView.BIG;

    const itemsPerRow = isBig ? 1 : 4;
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

    const rowRender = ({index, isScrolling, key, style}: ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for (let i = fromIndex; i < toIndex; i++) {
            items.push(
                <ArticleListItem
                    key={articles[i].id}
                    article={articles[i]}
                    view={view}
                    className={cls.card}
                    target={target}
                />
            )
        }

        return (
            <div
                key={key}
                style={style}
                className={cls.row}
            >
                {items}
            </div>
        )
    }

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                key={article.id}
                article={article}
                view={view}
                className={cls.card}
                target={target}
            />
        )
    }

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text
                    title={t('Статьи не найдены')}
                    size={TextSize.L}
                />
            </div>
        )
    }

    return (
        <WindowScroller
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({
                  height,
                  width,
                  registerChild,
                  onChildScroll,
                  isScrolling,
                  scrollTop
              }) => (
                <div
                    ref={registerChild}
                    className={classNames(cls.ArticleList, {}, [className, cls[view]])}
                >
                    <List
                        height={height ?? 700}
                        width={width ? width - 80 : 700}
                        rowHeight={isBig ? 750 : 330}
                        rowCount={rowCount}
                        rowRenderer={rowRender}
                        autoHeight
                        onScroll={onChildScroll}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                    />
                    {isLoading && getSkeletons(view)}
                </div>
            )}
        </WindowScroller>
    );
});
