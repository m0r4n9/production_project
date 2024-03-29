import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {Profile} from '@/entities/Profile';
import {getProfileForm} from "../../selectors/getProfileForm/getProfileForm";
import {validateProfile} from '../validateProfile/validateProfile';

import {ValidateProfileError} from "../../consts/consts";


// проблема была в ThunkConfig
export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>(
    'profile/updateProfileData',
    async (profileId, thunkAPI) => {
        const {extra, rejectWithValue, getState} = thunkAPI;

        const formData = getProfileForm(getState());
        const errors = validateProfile(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);
            return response.data
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    }
)
