import {StateSchema} from "@/app/providers/StoreProvider";
import {getLoginPassword} from "./getLoginPassword";


describe('getLoginPassword.test', function () {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '12324'
            }
        }
        expect(getLoginPassword(state as StateSchema)).toEqual('12324');
    });

    test('should return false with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    })
});
