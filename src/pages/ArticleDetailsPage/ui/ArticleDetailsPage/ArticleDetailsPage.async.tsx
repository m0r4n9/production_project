import {lazy} from "react";

export const ArticleDetailsPageAsync = lazy(() => new Promise(resolve => {
    // @ts-ignore
    // Так в реальных проектах не делать, это для примера
    setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500)
}));
