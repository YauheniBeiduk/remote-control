import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import nodeExternals from 'webpack-node-externals';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    mode: "production",
    target: "node",
    entry: "./index.ts",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: "ts-loader",
                },
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    externals: [nodeExternals()],
    output: {
        filename: "main.js",
        path: resolve(__dirname, "dist"),
        clean: true,
    },
};