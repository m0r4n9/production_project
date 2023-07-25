import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss';
import {memo, useCallback, useEffect} from "react";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlesPageReducer} from "../../model/slice/articlesPageSlice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Page} from "@/widgets/Page";
import {fetchNextArticlesPage} from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import {ArticlesPageFilters} from "../ArticlePageFilters/ArticlesPageFilters";
import {useSearchParams} from "react-router-dom";
import {ArticleInfinityList} from "../ArticleInfinityList/ArticleInfinityList";
import {initArticlesPage} from "../../model/services/initArticlesPage/initArticlesPage";

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const {
        className
    } = props;
    const dispatch = useAppDispatch();
    let [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initArticlesPage(searchParams));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters/>
                <ArticleInfinityList className={cls.list}/>
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticlesPage);
