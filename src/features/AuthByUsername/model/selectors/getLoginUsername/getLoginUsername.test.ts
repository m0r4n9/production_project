import {StateSchema} from "app/providers/StoreProvider";
import {getLoginUsername} from "./getLoginUsername";


describe('getLoginUsername.test', function () {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'test'
            }
        }
        expect(getLoginUsername(state as StateSchema)).toEqual('test');
    });

    test('should return false with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    })
});
