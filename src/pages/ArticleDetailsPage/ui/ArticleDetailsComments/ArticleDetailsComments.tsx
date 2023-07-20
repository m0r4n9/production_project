import {classNames} from "shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next"
import {memo, useCallback, useEffect} from 'react';
import {Text, TextSize} from "shared/ui/Text/Text";
import {AddCommentForm} from "features/addCommentForm";
import {CommentList} from "entities/Comment";
import {useSelector} from "react-redux";
import {getArticleComments} from "../../model/slice/articleDetailsCommentsSlice";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {addCommentForArticle} from "../../model/services/addCommentForArticle/addCommentForArticle";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentsByArticleId
} from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import {VStack} from "shared/ui/Stack/VStack/VStack";

interface articleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments = memo((props: articleDetailsCommentsProps) => {
    const {className, id} = props;
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, []);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    return (
        <VStack
            max
            gap='16'
            className={classNames('', {}, [className])}
        >
            <Text
                size={TextSize.L}
                title={t('Комментарии')}
            />
            <AddCommentForm onSendComment={onSendComment}/>
            <CommentList
                isLoading={commentsIsLoading}
                commentList={comments}
            />
        </VStack>
    );
});
