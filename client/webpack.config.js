const path = require("path")

module.exports = (/** @type {{ production: any; }} */ env) => ({
    mode: env.production ? "production" : "development", // Set the mode based on the environment
    entry: "./src/index.js", // Entry point for your application
    output: {
        path: path.resolve(__dirname, "dist"), // Output directory
        filename: "bundle.js", // Output bundle filename
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Process both .js and .jsx files
                exclude: /node_modules/, // Exclude node_modules to speed up the build process
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"], // Use Babel presets for modern JavaScript and React
                    },
                },
            },
            {
                test: /\.css$/, // For CSS files
                use: ["style-loader", "css-loader"], // Loaders to process CSS files
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // For image files
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]", // Keep original name and append a hash for cache busting
                            outputPath: "images", // Output directory for images
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, // For font files
                use: ["file-loader"], // File loader for fonts
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"], // Resolve both .js and .jsx files
    },
    devtool: env.production ? "source-map" : "eval-source-map", // Use source maps in production
    devServer: {
        contentBase: path.resolve(__dirname, "dist"), // Serve content from the dist directory
        compress: true, // Enable gzip compression
        port: 9000, // Port to run the dev server
        historyApiFallback: true, // Enable history API fallback for React Router
        hot: true, // Enable hot module replacement
    },
})
