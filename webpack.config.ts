import path from "path";
import { Configuration, DefinePlugin } from "webpack";
import WebpackShellPluginNext from "webpack-shell-plugin-next";
import Dotenv from "dotenv-webpack";

const isDevelopment = process.env.NODE_ENV !== "production";

const config: Configuration = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
    }),
    ...(isDevelopment ? [new Dotenv()] : []),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ["node ./scripts/add-shebang.mjs"],
        blocking: false,
        parallel: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
};

export default config;
