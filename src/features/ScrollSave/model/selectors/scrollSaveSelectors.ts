import {StateSchema} from "app/providers/StoreProvider";
import {createSelector} from "@reduxjs/toolkit";

export const getScrollSaveScroll = (state: StateSchema) => state.scrollSave.scroll;
export const getScrollSaveByPath = createSelector(
    getScrollSaveScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0
)
