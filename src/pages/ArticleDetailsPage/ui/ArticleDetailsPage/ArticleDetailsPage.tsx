import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss';
import {useTranslation} from "react-i18next"
import {memo} from "react";
import {ArticleDetails} from "@/entities/Article";
import {useParams} from "react-router-dom";
import {Text, TextAlign, TextTheme} from "@/shared/ui/Text/Text";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {Page} from "@/widgets/Page/";
import {articleDetailsPageReducer} from "../../model/slice";
import {ArticleDetailsPageHeader} from "@/pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import {VStack} from "@/shared/ui/Stack/VStack/VStack";
import {ArticleRecommendationsList} from "@/features/articleRecomendationsList";
import {ArticleDetailsComments,} from "../ArticleDetailsComments/ArticleDetailsComments";

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
    const {t} = useTranslation('article-details');
    const {id} = useParams<{ id: string }>();

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
                    <ArticleRecommendationsList/>
                    <ArticleDetailsComments id={id}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
