import {ReactNode} from "react";
import {Provider} from "react-redux";
import {createReduxStore} from "app/providers/StoreProvider/config/store";
import {StateSchema} from "app/providers/StoreProvider/config/StateSchema";
import { useNavigate } from "react-router-dom";

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = ({children, initialState}: StoreProviderProps) => {
    const navigate = useNavigate();
    const store = createReduxStore(initialState as StateSchema, navigate);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
