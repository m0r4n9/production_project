import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {
    getArticlePageHasMore,
    getArticlePageNum,
    getArticlesPageIsLoading
} from "../../selectors/articlesPageSelectors";
import {articlesPageActions} from "../../slice/articlesPageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const hasMore = getArticlePageHasMore(getState());
        const page = getArticlePageNum(getState());
        const isLoading = getArticlesPageIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1))
            dispatch(fetchArticlesList({}));
        }
    }
)
