import path from "path";
import { Configuration } from "webpack";
import WebpackShellPluginNext from "webpack-shell-plugin-next";
import Dotenv from "dotenv-webpack";

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
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ["node ./scripts/add-shebang.mjs"],
        blocking: false,
        parallel: true,
      },
    }),
    new Dotenv(),
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
