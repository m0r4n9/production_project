import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {getArticlePageInited} from "../../selectors/articlesPageSelectors";
import {articlesPageActions} from "../../slice/articlesPageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";
import {ArticleSortField, ArticleType} from "entities/Article";
import {SortOrder} from "shared/types";

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkAPI) => {
        const {dispatch, getState} = thunkAPI;
        const inited = getArticlePageInited(getState());

        if (!inited) {
            const sortFromURL = searchParams.get('sort') as ArticleSortField;
            const orderFromURL = searchParams.get('order') as SortOrder;
            const typeFromURL = searchParams.get('type') as ArticleType;
            const searchFromURL = searchParams.get('search');

            if (sortFromURL) dispatch(articlesPageActions.setSort(sortFromURL));
            if (orderFromURL) dispatch(articlesPageActions.setOrder(orderFromURL));
            if (typeFromURL) dispatch(articlesPageActions.setType(typeFromURL));
            if (searchFromURL) dispatch(articlesPageActions.setSearch(searchFromURL));

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    }
)
