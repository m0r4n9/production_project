import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesign/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesign/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationApi';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const {
            data: articles,
            isLoading,
            error,
        } = useArticleRecommendationsList(3);

        if (isLoading || error || !articles) {
            return null;
        }

        return (
            <VStack gap="16" className={classNames('', {}, [className])}>
                <ToggleFeatures
                    feature="isAppRedesign"
                    on={
                        <Text
                            size='l'
                            title={t('Рекомендуем')}
                        />
                    }
                    off={
                        <TextDeprecated
                            size={TextSize.L}
                            title={t('Рекомендуем')}
                        />
                    }
                />

                <ArticleList articles={articles} target="_blank" />
            </VStack>
        );
    },
);
