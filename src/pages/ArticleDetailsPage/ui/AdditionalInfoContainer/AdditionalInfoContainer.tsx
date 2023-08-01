import {memo, useCallback} from 'react';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesign/Card';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import {useNavigate} from "react-router-dom";
import {getRouteArticleEdit} from "@/shared/const/router";

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData);
    const navigate = useNavigate();

    const onEditArticle = useCallback(() => {
        if (article?.id) {
            navigate(getRouteArticleEdit(article?.id));
        }
    }, [article?.id, navigate]);

    if (!article) {
        return null;
    }

    return (
        <Card padding="24" border="partial" className={cls.card}>
            <ArticleAdditionalInfo
                author={article.user}
                createdAd={article.createdAt}
                views={article.views}
                onEdit={onEditArticle}
            />
        </Card>
    );
});
