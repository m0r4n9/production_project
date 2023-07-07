import React from 'react';

import {Button, ThemeButton} from './Button';
import 'app/styles/index.scss';

export default {
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        //👇 Now all Button stories will be primary.
        primary: true,
    },
};

export const Primary = {
    args: {
        children: 'Text'
    },
};

export const Secondary = {
    args: {
        children: 'Text',
        theme: ThemeButton.CLEAR,
    },
};

export const Outline = {
    args: {
        children: 'Text',
        theme: ThemeButton.OUTLINE,
    },
};
