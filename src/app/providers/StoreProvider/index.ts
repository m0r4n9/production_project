import {StoreProvider} from "app/providers/StoreProvider/ui/StoreProvider";
import {createReduxStore, AppDispatch} from "./config/store";
// Типы можно импортировать из выше стоящего слоя
import type {StateSchema, ReduxStoreWithManager, ThunkConfig, StateSchemaKey} from "./config/StateSchema";

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager,
    StateSchemaKey,
    ThunkConfig,
    AppDispatch
};
