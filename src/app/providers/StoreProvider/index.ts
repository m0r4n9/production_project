import {StoreProvider} from "app/providers/StoreProvider/ui/StoreProvider";
import {createReduxStore} from "./config/store";
// Типы можно импортировать из высше стоящего слоя
import type {StateSchema, ReduxStoreWithManager} from "./config/StateSchema";

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager
};
