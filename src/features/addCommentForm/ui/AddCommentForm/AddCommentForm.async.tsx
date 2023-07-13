import {FC, lazy} from "react";
import {AddCommentFormProps} from "./AddCommentForm";

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(() => new Promise(resolve => {
    // @ts-ignore
    // Так в реальных проектах не делать, это для примера
    setTimeout(() => resolve(import('./AddCommentForm')), 1500);
}))
