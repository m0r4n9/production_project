import {lazy} from "react";

export const MainPageAsync = lazy(() => new Promise(resolve => {
    // @ts-ignore
    // Так в реальных проектах не делать, это для примера
    setTimeout(() => resolve(import('./MainPage')), 400)
}));
