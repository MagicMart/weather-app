const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: "babel-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.svg/,
                use: {
                    loader: "svg-url-loader",
                    options: {},
                },
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new CopyPlugin([{ from: "_redirects" }, { from: ".env" }]),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new Dotenv(),
    ],
};
