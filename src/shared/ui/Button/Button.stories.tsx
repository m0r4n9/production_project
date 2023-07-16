import type {Meta, StoryObj} from '@storybook/react';

import {Button, ButtonSize, ThemeButton} from './Button';
import {Theme, ThemeProvider} from "app/providers/ThemeProvider";

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Text',
    },
    decorators: [
        (Story) => (
            <ThemeProvider initialTheme={Theme.DARK}>
                <div className={`app ${Theme.DARK}`}>
                    <Story/>
                </div>
            </ThemeProvider>
        )
    ]
};

export const Clear: Story = {
    args: {
        ...Primary.args,
        theme: ThemeButton.CLEAR,
    }
};

export const ClearInverted: Story = {
    args: {
        ...Primary.args,
        theme: ThemeButton.CLEAR_INVERTED
    },
};

export const Outline: Story = {
    args: {
        ...Primary.args,
        theme: ThemeButton.OUTLINE
    },
};

export const OutlineSizeL: Story = {
    args: {
        ...Outline.args,
        size: ButtonSize.L
    },
};


export const OutlineSizeXL: Story = {
    args: {
        ...Outline.args,
        size: ButtonSize.XL
    }
}

export const OutlineDark: Story = {
    args: {
        ...Outline.args
    },
}
