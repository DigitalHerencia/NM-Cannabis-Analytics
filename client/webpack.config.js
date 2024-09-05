import { join, resolve as _resolve } from 'path';
export const mode = 'development';
export const entry = join(__dirname, 'app', 'index');
export const watch = true;
export const output = {
  path: join(__dirname, 'dist'),
  publicPath: '/dist/',
  filename: "bundle.js",
  chunkFilename: '[name].js'
};
export const module = {
  rules: [{
    test: /.jsx?$/,
    include: [
      _resolve(__dirname, 'app')
    ],
    exclude: [
      _resolve(__dirname, 'node_modules')
    ],
    loader: 'babel-loader',
    options: {
      presets: [
        ["@babel/env", {
          "targets": {
            "browsers": "last 2 chrome versions"
          }
        }]
      ]
    }
  }]
};
export const resolve = {
  extensions: ['.json', '.js', '.jsx']
};
export const devtool = 'source-map';
export const devServer = {
  contentBase: join(__dirname, '/dist/'),
  inline: true,
  host: 'localhost',
  port: 8080,
};