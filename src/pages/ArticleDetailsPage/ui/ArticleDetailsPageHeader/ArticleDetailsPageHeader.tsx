import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPageHeader.module.scss';
import {useTranslation} from "react-i18next"
import {memo, useCallback} from 'react';
import {Button, ThemeButton} from "shared/ui/Button/Button";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {getArticleDetailsData} from "entities/Article";
import {getCanEditArticle} from "../../model/selectors/article";

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const {className} = props;
    const {t} = useTranslation('article-details');
    const navigate = useNavigate();
    const userData = useSelector(getUserAuthData);
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={onEditArticle}
                    className={cls.createLink}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </div>
    );
});
