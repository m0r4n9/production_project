import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {Text, TextSize} from "shared/ui/Text/Text";
import {ArticleList} from "entities/Article";
import {VStack} from "shared/ui/Stack/VStack/VStack";
import {useArticleRecommendationsList} from "../../api/articleRecommendationApi";

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {data: articles, isLoading, error} = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
        return null;
    }


    return (
        <VStack gap='8' className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Рекомендуем')}
            />
            <ArticleList
                articles={articles}
                virtualized={false}
                target="_blank"
            />
        </VStack>
    );
});