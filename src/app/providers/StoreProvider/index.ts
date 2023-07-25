import {StoreProvider} from "@/app/providers/StoreProvider/ui/StoreProvider";
import type {AppDispatch} from "./config/store";
import {createReduxStore} from "./config/store";
// Типы можно импортировать из выше стоящего слоя
import type {StateSchema, ReduxStoreWithManager, ThunkConfig, StateSchemaKey} from "./config/StateSchema";

export {
    StoreProvider,
    createReduxStore,
};

export type {
    StateSchema,
    AppDispatch,
    ThunkConfig,
    StateSchemaKey,
    ReduxStoreWithManager
}
