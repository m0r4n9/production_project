import {lazy} from "react";

export const ArticlesPageAsync = lazy(() => new Promise(resolve => {
    // @ts-ignore
    // Так в реальных проектах не делать, это для примера
    setTimeout(() => resolve(import('./ArticlesPage')), 1500)
}));
