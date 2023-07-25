import {StateSchema} from "@/app/providers/StoreProvider";

// Налиш оператор (Оператор нулевого слияния (??))
export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
