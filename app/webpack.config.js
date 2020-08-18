// const path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
//
// module.exports = {
//   mode: 'development',
//   entry: "./src/javascript/app.js",
//   output: {
//     filename: "app.js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   plugins: [
//     new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
//   ],
//   devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
// };


const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  mode : 'development',
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './index.html', to: "index.html" }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      { test: /\.json$/, exclude: /(node_modules|bower_components)/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }

    ]
  }
}
