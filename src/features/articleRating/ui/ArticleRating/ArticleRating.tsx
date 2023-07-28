import {useTranslation} from "react-i18next"
import {memo, useCallback} from 'react';
import {RatingCard} from "@/entities/Rating";
import {useGetArticleRating, useRateArticle} from "../../api/articleRatingApi";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Skeleton} from "@/shared/ui/deprecated/Skeleton";

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = (props: ArticleRatingProps) => {
    const {className, articleId} = props;
    const {t} = useTranslation();
    const userData = useSelector(getUserAuthData);

    const {data, isLoading} = useGetArticleRating({
        userId: userData?.id ?? '',
        articleId
    });

    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback((starCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starCount,
                feedback
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onAccept = useCallback((starCount: number, feedback?: string) => {
        handleRateArticle(starCount, feedback);
    }, [handleRateArticle]);

    const onCancel = useCallback((starCount: number) => {
        handleRateArticle(starCount)
    }, [handleRateArticle]);

    const rating = data?.[0];

    if (isLoading) {
        return <Skeleton width='100%' height={120}/>
    }

    return (
        <RatingCard
            rate={rating?.rate}
            onAccept={onAccept}
            onCancel={onCancel}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
            hasFeedback={true}
            className={className}
        />
    );
};

export default memo(ArticleRating);
