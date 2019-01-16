const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', 
            '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"]
      },
      { test: /\.woff$/, use: ['url-loader?limit=100000'] }
    ]
  }
};