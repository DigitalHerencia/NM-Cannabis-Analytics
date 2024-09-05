const path = require("path")

module.exports = (/** @type {{ production: any; }} */ env) => {
    return {
        mode: env.production ? "production" : "development",
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
        },
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
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[hash].[ext]",
                                outputPath: "images",
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ["file-loader"],
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
        devtool: env.production ? "source-map" : "eval-source-map",
        devServer: {
            contentBase: path.resolve(__dirname, "dist"),
            compress: true,
            port: 5000,
            historyApiFallback: true,
            hot: true,
        },
    }
}
