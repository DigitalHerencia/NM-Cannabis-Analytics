// @ts-nocheck
import { CleanWebpackPlugin } from "clean-webpack-plugin" // For cleaning up previous builds
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin" // For generating HTML file
import MiniCssExtractPlugin from "mini-css-extract-plugin" // For extracting CSS
import path from "path"
import TerserPlugin from "terser-webpack-plugin"
import webpack from "webpack"
import webpackBundleAnalyzer from "webpack-bundle-analyzer" // Optional, to analyze bundle size

export default function WebpackConfig(env) {
    const isProduction = env.production // flag for production

    return {
        entry: "./src/index.js",
        output: {
            path: path._resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            publicPath: "/",
        },
        mode: isProduction ? "production" : "development",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                        },
                    },
                },
                {
                    test: /\.(css|scss)$/,
                    _use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                    get use() {
                        return this._use
                    },
                    set use(value) {
                        this._use = value
                    },
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 8192,
                        },
                    },
                },
                {
                    test: /\.(woff(2)?|ttf|eot)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "fonts/[name].[hash][ext]",
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                favicon: "./public/favicon.ico",
                minify: isProduction && {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(
                    isProduction ? "production" : "development"
                ),
            }),
            isProduction && new webpackBundleAnalyzer.BundleAnalyzerPlugin(),
        ].filter(Boolean),
        resolve: {
            extensions: [".js", ".jsx"],
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: "all",
            },
            runtimeChunk: "single",
        },
        devServer: {
            historyApiFallback: true,
            static: path.join(__dirname, "public"),
            compress: true,
            port: 3000,
            hot: true,
            setupMiddlewares: (middlewares, _devServer) => {
                middlewares.unshift({
                    name: "custom-before-middleware",
                    middleware: function (_req, _res, next) {
                        console.log("Middleware before Webpack setup")
                        next()
                    },
                })

                middlewares.push({
                    name: "custom-after-middleware",
                    middleware: function (_req, _res, next) {
                        console.log("Middleware after Webpack setup")
                        next()
                    },
                })

                return middlewares
            },
        },
        performance: {
            hints: isProduction ? "warning" : false,
            maxAssetSize: 250000,
            maxEntrypointSize: 250000,
        },
    }
}
