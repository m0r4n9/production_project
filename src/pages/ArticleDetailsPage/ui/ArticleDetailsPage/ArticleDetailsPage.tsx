import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss';
import {useTranslation} from "react-i18next"
import {memo, useCallback, useEffect} from "react";
import {ArticleDetails, ArticleList} from "entities/Article";
import {useParams} from "react-router-dom";
import {Text, TextAlign, TextSize, TextTheme} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {getArticleComments} from "../../model/slice/articleDetailsCommentsSlice";
import {useSelector} from "react-redux";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchCommentsByArticleId} from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {AddCommentForm} from "features/addCommentForm";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {Page} from "widgets/Page/";
import {getArticleRecommendations} from "../../model/slice/articleDetailsRecommendationsSlice";
import {
    getArticleRecommendationsError,
    getArticleRecommendationsIsLoading
} from "../../model/selectors/recommendations";
import {
    fetchArticleRecommendations
} from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import {articleDetailsPageReducer} from "../../model/slice";
import {ArticleDetailsPageHeader} from "pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import {VStack} from "shared/ui/Stack/VStack/VStack";

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
    const {t} = useTranslation('article-details');
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendations.selectAll)
    const recommendationsLoading = useSelector(getArticleRecommendationsIsLoading);
    const error = useSelector(getArticleRecommendationsError);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    }, []);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text title={t('Статья не найдена')} theme={TextTheme.ERROR} align={TextAlign.CENTER}/>
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack
                    max
                    gap='16'
                >
                    <ArticleDetailsPageHeader/>
                    <ArticleDetails id={id}/>
                    <Text
                        size={TextSize.L}
                        title={t('Рекомендуем')}
                        className={cls.comment}
                    />
                    <ArticleList
                        articles={recommendations}
                        isLoading={recommendationsLoading}
                        target="_blank"
                        className={cls.recommendations}
                    />
                    <Text
                        size={TextSize.L}
                        title={t('Комментарии')}
                        className={cls.comment}
                    />
                    <AddCommentForm onSendComment={onSendComment}/>
                    <CommentList
                        isLoading={commentsIsLoading}
                        commentList={comments}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
