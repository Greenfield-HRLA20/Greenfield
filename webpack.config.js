const path = require('path')
var SRC_DIR = path.join(__dirname, '/Client/src');
var DIST_DIR = path.join(__dirname, '/Client/dist');

console.log(DIST_DIR)

const config = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: path.resolve(__dirname, '/Client/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  }
}

module.exports = config