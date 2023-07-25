import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {Comment} from "@/entities/Comment";

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {
        const {extra, rejectWithValue} = thunkAPI;

        if (!articleId) {
            return rejectWithValue('Do not have id articles')
        }

        try {
            const response = await extra.api.get<Comment[]>(`/comments/`, {
                params: {
                    articleId,
                    _expand: 'user'
                }
            });
            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    }
)
