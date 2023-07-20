import {screen} from "@testing-library/react";
import {Counter} from "./Counter";
import {componentRender} from "shared/lib/tests/componentRender/componentRender";

// control + space

describe('Counter', () => {
    test('Test render', () => {
        componentRender(<Counter/>, {
            initialState: {
                counter: {
                    value: 10
                }
            }
        })
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

});
