import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUserAuthData,} from "entities/User";
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema";
import {Comment} from "entities/Comment";
import {getArticleDetailsData} from "entities/Article";
import {
    fetchCommentsByArticleId
} from "../../services/fetchCommentsByArticleId/fetchCommentsByArticleId";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const {extra, dispatch, rejectWithValue, getState} = thunkAPI;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());


        if (!userData || !text || !article) {
            return rejectWithValue('No data');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text
            });
            dispatch(fetchCommentsByArticleId(article.id));
            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    }
)
