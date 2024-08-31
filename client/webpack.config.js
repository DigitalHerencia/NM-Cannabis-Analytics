// @ts-nocheck
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
    }),
]

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
        publicPath: "/",
    },
    mode: "production",
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: "asset/inline",
            },
        ],
    },
    plugins: plugins, // Ensure plugins are used here
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "public"),
        open: true,
        hot: true,
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
}
