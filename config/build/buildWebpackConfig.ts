import {BuildOptions} from "./types/config";
import webpack from "webpack";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildPlugins} from "./buildPlugins";
import {buildDevServer} from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {paths, mode, isDev} = options;

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: "[name].[contenthash].js",
            path: paths.build,
            clean: true,
            // Для динамических URL на примере .../articles/:id
            publicPath: '/'
        },
        module: {
            // Конфигурируем loader. Они обрабатывают файлы с расширениями, которые выходят за рамки js
            rules: buildLoaders(options)
        },
        // Расширения для тех файлов для которых мы не будем указывать расширение при import
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: isDev ? 'eval-cheap-source-map': undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}
