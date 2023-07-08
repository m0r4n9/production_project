import {getCounter} from "./getCounter";
import {DeepPartial} from "@reduxjs/toolkit";
import {StateSchema} from "app/providers/StoreProvider";

describe('getCounter', function () {
    test('should return counter value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 }
        }
        expect(getCounter(state as StateSchema)).toEqual({value: 10});
    })
});