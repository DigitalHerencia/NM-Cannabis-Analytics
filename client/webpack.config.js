import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default (env) => {
  const config = merge(common(env), {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
          exclude: [
            /node_modules\/react-map-gl/,
            // Add any other packages here as needed
          ].filter(Boolean),
        },
      ],
    },
    devServer: {
      setupMiddlewares: (middlewares, server) => {
        // Your custom middleware setup
        if (server) {
          console.log(server);
        }
        if (middlewares) {
          console.log(middlewares);
        }
        return middlewares || [];
      },
      // other devServer settings
    },
    // other configuration settings
  });

  return config || {};
};
