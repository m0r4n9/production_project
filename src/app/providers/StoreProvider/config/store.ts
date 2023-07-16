import {CombinedState, configureStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {StateSchema, ThunkExtraArg} from "./StateSchema";
import {counterReducer} from "entities/Counter";
import {userReducer} from "entities/User";
import {createReducerManager} from "app/providers/StoreProvider/config/reducerManager";
import {$api} from "shared/api/api";

export function createReduxStore(
    initialState?: StateSchema,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
    }

    const reducerManager = createReducerManager(rootReducers);

    const extraArgs: ThunkExtraArg = {
        api: $api,
    }


    const store = configureStore({
        // !!!
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArgs,
            }
        })
    });

    // @ts-ignore
    // У store с коробки нет поля reducerManager и надо будет делать свой тип
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
