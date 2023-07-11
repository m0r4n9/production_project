import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import i18n from "shared/config/i18n/i18n";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";
import {ThunkConfig, ThunkExtraArg} from "app/providers/StoreProvider/config/StateSchema";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const {extra, dispatch, rejectWithValue} = thunkAPI;
        try {
            const response = await extra.api.post<User>('/login', authData);
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue(i18n.t('Вы ввели неправильный логин или пароль'));
        }
    }
)
