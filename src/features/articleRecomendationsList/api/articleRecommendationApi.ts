import {rtkApi} from "shared/api/rtkApi";

const recommendationsList = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit
                }
            }),
        }),
    }),
})

export const useArticleRecommendationsList = recommendationsList.useGetArticleRecommendationsListQuery;
