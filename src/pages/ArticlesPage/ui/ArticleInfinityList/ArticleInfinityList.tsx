import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from 'react';
import {useSelector} from "react-redux";
import {getArticles} from "../../model/slice/articlesPageSlice";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from "../../model/selectors/articlesPageSelectors";
import {ArticleList} from "@/entities/Article";
import {Text, TextTheme} from "@/shared/ui/deprecated/Text";

interface ArticleInfinityListProps {
    className?: string;
}

export const ArticleInfinityList = memo((props: ArticleInfinityListProps) => {
    const {className} = props;
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);


    if (error) {
        return (
            <Text title='Произошла ошибка' theme={TextTheme.ERROR}/>
        )
    }

    return (
        <div>
            <ArticleList
                isLoading={isLoading}
                view={view}
                articles={articles}
                className={className}
            />
        </div>
    );
});
