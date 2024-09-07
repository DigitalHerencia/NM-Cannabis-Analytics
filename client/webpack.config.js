/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
// @ts-nocheck
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // For cleaning up previous builds
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin") // Minifying CSS
const HtmlWebpackPlugin = require("html-webpack-plugin") // For generating HTML file
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // For extracting CSS
const { resolve: _resolve, join } = require("path")
const TerserPlugin = require("terser-webpack-plugin") // Minifying JS
const { DefinePlugin: _DefinePlugin } = require("webpack")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer") // Optional, to analyze bundle size

export default (env) => {
    const isProduction = env.production // flag for production

    return {
        entry: "./src/index.js",
        output: {
            path: _resolve(__dirname, "dist"),
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
                    use: [
                        _loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
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
            new _DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(
                    isProduction ? "production" : "development"
                ),
            }),
            isProduction && new BundleAnalyzerPlugin(),
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
            static: join(__dirname, "public"),
            compress: true,
            port: 3000,
            hot: true,
            setupMiddlewares: (middlewares, devServer) => {
                middlewares.unshift({
                    name: "custom-before-middleware",
                    middleware: function (req, res, next) {
                        console.log("Middleware before Webpack setup")
                        next()
                    },
                })

                middlewares.push({
                    name: "custom-after-middleware",
                    middleware: function (req, res, next) {
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
