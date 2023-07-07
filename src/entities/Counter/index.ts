import {counterActions, counterReducer} from "entities/Counter/model/slice/counterSlice";
import {Counter} from "entities/Counter/ui/Counter";
import {CounterSchema} from "./model/types/counterSchema";

export {
    counterReducer,
    Counter,
    CounterSchema
};
