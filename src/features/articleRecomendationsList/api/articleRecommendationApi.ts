import {rtkApi} from "@/shared/api/rtkApi";
import {Article} from "@/entities/Article";

const recommendationsList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    _expand: 'user'
                }
            }),
        }),
    }),
})

export const useArticleRecommendationsList = recommendationsList.useGetArticleRecommendationsListQuery;
