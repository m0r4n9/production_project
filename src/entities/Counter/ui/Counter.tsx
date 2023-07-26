import {Button} from "@/shared/ui/Button";
import {useDispatch} from "react-redux";
import {useCounterActions} from "../model/slice/counterSlice";
import {useCounterValue} from "../model/selectors/getCounterValue/getCounterValue";
import {useTranslation} from "react-i18next";


export const Counter = () => {
    const counterValue = useCounterValue();
    const {t} = useTranslation();
    const {decrement, increment, add} = useCounterActions();

    const handleIncrement = () => {
        increment();
    };

    const handleDecrement = () => {
        decrement();
    };

    const handleAddFive = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">value = {counterValue}</h1>
            <Button data-testid="increment-btn" onClick={handleIncrement}>
                {t('increment')}
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDecrement}>
                {t('decrement')}
            </Button>
            <Button onClick={handleAddFive}>
                add five
            </Button>
        </div>
    );
};
