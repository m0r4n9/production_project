import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next"
import {memo, useCallback} from 'react';
import {Button, ThemeButton} from "@/shared/ui/deprecated/Button";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {getArticleDetailsData} from "@/entities/Article";
import {getCanEditArticle} from "../../model/selectors/article";
import {HStack} from "@/shared/ui/redesign/Stack";
import {getRouteArticleEdit, getRouteArticles} from "@/shared/const/router";

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const {className} = props;
    const {t} = useTranslation('article-details');
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        if (article?.id) {
            navigate(getRouteArticleEdit(article?.id));
        }
    }, [article?.id, navigate]);

    return (
        <HStack
            max
            justify='between'
            className={classNames('', {}, [className])}
        >
            <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
                {t('Назад к списку')}
            </Button>
            {canEdit && (
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
