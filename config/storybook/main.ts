import type {StorybookConfig} from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: '@storybook/addon-styling',
            options: {
                sass: {
                    // Require your Sass preprocessor here
                    implementation: require('sass'),
                },
            }
        }
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    },
    docs: {
        autodocs: "tag"
    },
    core: {
        builder: '@storybook/builder-webpack5'
    }
};
export default config;
export const framework = "@storybook/react";
