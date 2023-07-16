import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Article, ArticleType} from "entities/Article";
import {
    getArticlePageLimit,
    getArticlePageNum,
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType
} from "../../selectors/articlesPageSelectors";
import {addQueryParams} from "shared/lib/url/addQueryParams/addQueryParams";

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const {extra, rejectWithValue, getState} = thunkAPI;
        const limit = getArticlePageLimit(getState());
        const page = getArticlePageNum(getState());
        const sort = getArticlePageSort(getState());
        const order = getArticlePageOrder(getState());
        const search = getArticlePageSearch(getState());
        const type = getArticlePageType(getState());

        try {
            addQueryParams({
                sort, order, search, type
            });
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
                }
            });
            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    }
)
