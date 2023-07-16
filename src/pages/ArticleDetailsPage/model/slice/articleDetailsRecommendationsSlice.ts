import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    ArticleDetailsRecommendationsSchema
} from "../types/articleDetailsRecommendationsSchema";
import {StateSchema} from "app/providers/StoreProvider";
import {Article} from "entities/Article";
import {
    fetchArticleRecommendations
} from "../services/fetchArticleRecommendations/fetchArticleRecommendations";

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state: StateSchema) =>
        state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
)

export const articleDetailsRecommendationsSlice = createSlice({
    name: 'articleDetailsRecommendations',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
    }),
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchArticleRecommendations.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        })
        .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
            state.isLoading = false;
            // Адаптер сам все нормализует
            recommendationsAdapter.setAll(state, action.payload);
        })
        .addCase(fetchArticleRecommendations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
}
});

export const {
    actions: articleDetailsRecommendationsActions,
    reducer: articleDetailsRecommendationsReducer
} = articleDetailsRecommendationsSlice;
