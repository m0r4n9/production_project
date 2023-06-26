import {lazy} from "react";

export const AboutPageAsync = lazy(() => new Promise(resolve => {
    // @ts-ignore
    // Так в реальных проектах не делать, это для примера
    setTimeout(() => resolve(import('./AboutPage')), 1500)
}));