import * as path from "path"
import {
  Configuration,
  optimize,
} from "webpack"

const conf: Configuration = {
  context: __dirname,
  entry: {
    app: "./index.ts",
  },
  output: {
    path: path.resolve("./__built__"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // presets: ["babili"],
              plugins: [
                "babel-plugin-annotate-pure-call-in-variable-declarator",
              ],
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                "module": "es6",
                "target": "es5",
                "declaration": false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new optimize.ModuleConcatenationPlugin(),
    // new UglifyJSPlugin({
    //   ie8: false,
    //   ecma: 8,
    //   mangle: false,
    //   output: {
    //     comments: true,
    //     beautify: true,
    //   },
    //   warnings: true,
    // }),
  ],
}

export = conf
