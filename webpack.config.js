// var path = require("path")
// var webpack = require('webpack')


// module.exports = {
//   context: __dirname,
//   entry: {
//     "eucookies": [
//       './EuCookies.jsx'
//     ],
//     "baseExample": [
//       './examples/BaseExample.jsx'
//     ],

//   },

//   output: {
//       path: path.resolve('./dist/'),
//       filename: '[name].min.js',
//   },

//   plugins: [
//   ],

//   module: {
//     loaders: [
//       {
//         test: /\.less$/,
//         loader: 'style!css?minimize&keepSpecialComments=0!autoprefixer?{browsers:["last 2 versions"]}!less'
//       },
//       { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
//     ],
//   },

//   resolve: {
//     modulesDirectories: ['node_modules'],
//     extensions: ['', '.js', '.jsx']
//   }
// }