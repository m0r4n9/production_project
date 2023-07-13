import {Comment} from "entities/Comment";
import {EntityState} from "@reduxjs/toolkit";


// Тут используется нормализация данных
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: string;
}
