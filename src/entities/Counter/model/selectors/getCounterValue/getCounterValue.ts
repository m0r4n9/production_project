import {buildSelector} from "@/shared/lib/store";

// Почитать про createSelector !!!
export const [useCounterValue, getCounterValue] = buildSelector(state => state.counter.value);
