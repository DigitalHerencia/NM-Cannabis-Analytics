/* eslint-disable import/no-anonymous-default-export */
// @ts-nocheck
import { CleanWebpackPlugin } from "clean-webpack-plugin" // For cleaning up previous builds
import CssMinimizerPlugin from "css-minimizer-webpack-plugin" // Minifying CSS
import HtmlWebpackPlugin from "html-webpack-plugin" // For generating HTML file
import MiniCssExtractPlugin, {
    loader as _loader,
} from "mini-css-extract-plugin" // For extracting CSS
import { resolve as _resolve, join } from "path"
import TerserPlugin from "terser-webpack-plugin" // Minifying JS
import { DefinePlugin as _DefinePlugin } from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer" // Optional, to analyze bundle size

export default (env) => {
    const isProduction = env.production // flag for production

    return {
        // Entry point for the app
        entry: "./src/index.js",

        // Output for bundled code
        output: {
            path: _resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js", // Cache busting using contenthash
            publicPath: "/", // For proper routing in production
        },

        // Mode settings
        mode: isProduction ? "production" : "development",

        // Module rules for handling different file types
        module: {
            rules: [
                // Babel loader for JSX and ES6+ transpiling
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env", // Modern JS features transpiling
                                "@babel/preset-react", // React JSX support
                            ],
                        },
                    },
                },
                // CSS/SCSS Loader for Material-UI and other styles
                {
                    test: /\.(css|scss)$/,
                    use: [
                        _loader, // Extract CSS into separate files
                        "css-loader", // Translates CSS into CommonJS
                        "postcss-loader", // Adds vendor prefixes using PostCSS
                        "sass-loader", // Compiles Sass to CSS (if you're using SCSS)
                    ],
                },
                // Handling image assets
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 8192, // Convert assets < 8kb to base64 strings
                        },
                    },
                },
                // Font loading
                {
                    test: /\.(woff(2)?|ttf|eot)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "fonts/[name].[hash][ext]",
                    },
                },
            ],
        },

        // Plugins for production build
        plugins: [
            new CleanWebpackPlugin(), // Clean dist folder before each build
            new HtmlWebpackPlugin({
                template: "./public/index.html", // Inject JS bundles into HTML file
                favicon: "./public/favicon.ico", // Optional favicon
                minify: isProduction && {
                    // Minify HTML in production
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                },
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css", // Cache busting for CSS
            }),
            new _DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(
                    isProduction ? "production" : "development"
                ), // Setting environment for React
            }),
            isProduction && new BundleAnalyzerPlugin(), // Optional plugin to analyze bundle size
        ].filter(Boolean), // Filter out falsy values, like conditionally adding the analyzer plugin

        // Resolve file types for importing
        resolve: {
            extensions: [".js", ".jsx"],
        },

        // Optimization settings for production
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    // JS Minification
                    terserOptions: {
                        compress: {
                            drop_console: true, // Drop console statements in production
                        },
                    },
                }),
                new CssMinimizerPlugin(), // CSS Minification
            ],
            splitChunks: {
                chunks: "all", // Split vendor code from main bundle
            },
            runtimeChunk: "single", // Split runtime code into separate chunk for better caching
        },

        // DevServer config (if you need it during development)
        devServer: {
            historyApiFallback: true, // Enables routing using React Router in development
            static: join(__dirname, "public"),
            compress: true,
            port: 3000,
            hot: true, // Hot module replacement for faster development

            // Use setupMiddlewares instead of onBeforeSetupMiddleware and onAfterSetupMiddleware
            setupMiddlewares: (middlewares, devServer) => {
                // Add any middleware before Webpack DevServer's default middlewares
                middlewares.unshift({
                    name: "custom-before-middleware",
                    middleware: function (req, res, next) {
                        console.log("Middleware before Webpack setup")
                        next()
                    },
                })

                // Add any middleware after Webpack DevServer's default middlewares
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
    }
}
