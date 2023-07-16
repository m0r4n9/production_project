import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ScrollSaveSchema} from "../types/ScrollSaveSchema";

const initialState: ScrollSaveSchema = {
    scroll: {}
}

export const saveScrollSlice = createSlice({
    name: 'saveScroll',
    initialState,
    reducers: {
        setScrollPosition: (state, {payload}: PayloadAction<{path: string; position: number}>) => {
            state.scroll[payload.path] = payload.position;
        }
    },
});

// Delete Slice
export const {actions: saveScrollActions} = saveScrollSlice;
export const {reducer: saveScrollReducer} = saveScrollSlice;
