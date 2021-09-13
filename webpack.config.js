// // https://medium.com/@JedaiSaboteur/creating-a-react-app-from-scratch-f3c693b84658

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
            publicPath: './dist/',
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            publicPath: './dist/', // file loader와 동일
            name: '[name].[ext]?[hash]', // file loader와 동일
            limit: 5000,
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
