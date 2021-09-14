// // // https://medium.com/@JedaiSaboteur/creating-a-react-app-from-scratch-f3c693b84658
// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//   // mode: 'development',
//   entry: {
//     bundle: './src/index.js',
//   },
//   output: {
//     filename: '[name].js', //entry  객체에 설정한 key(ex main)으로 치환되어 엔트리가 여러개인 경우 동적 치환된다.
//     path: path.resolve('./dist'),
//   },
//   devServer: {
//     port: 3000,
//     watchContentBase: true,
//   },
//   resolve: { extensions: ['*', '.js', '.jsx'] },
//   plugins: [new webpack.HotModuleReplacementPlugin()],
//   module: {
//     rules: [
//       ////웹팩 로더는 한 파일에 대해 여러가지가 실행되는데 배열의 뒤에서부터 앞으로 작동한다.
//       {
//         test: /\.css$/, //png 확장자 처리
//         use: [
//           'style-loader', // 모듈로 변경된 스타일 시트를 돔에 추가하기 위함
//           'css-loader', //.css 확장자파일을 모듈로  변경하는 로더
//         ],
//       },
//       {
//         //소스코드에서 사용하는 모든파일을 모듈로 사용하게끔 만들어준다.
//         test: /\.png$/, //png 확장자 처리
//         loader: 'file-loader',
//         options: {
//           //publicPath옵션은 file-loader가 처리하는 파일을 모듈로 사용할 때 경로앞에 추가되는 문자열이다.
//           publicPath: '../dist/', // prefix를 아웃풋 경로로 지정함
//           name: '[name].[ext]', //  파일명 형식
//           // -> hash사용이유는 캐쉬갱신을 위함
//           //-> 정적 파일의 경우 브라우저 성능을 위해 캐시하게 되는데 내용이 달라지고
//           // -> 이름이 같으면 브라우저가 이전 캐시로 저장했던 내용을 사용하는 것을 방지하기 위함
//         },
//       },
//       {
//         // test: /\.(png|jpg|gif|svg)$/,
//         test: /\.png$/, //png 확장자 처리
//         use: {
//           loader: 'url-loader',
//           options: {
//             publicPath: '../dist/',
//             name: '[name].[ext]?[hash]',
//             limit: 5000,
//           },
//         },
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel-loader',
//         options: { presets: ['@babel/env'] },
//       },
//       {
//         test: /\.(gif|png|jpe?g|svg)$/i,
//         use: [
//           'file-loader',
//           {
//             loader: 'image-webpack-loader',
//             options: {
//               bypassOnDebug: true, // webpack@1.x
//               disable: true, // webpack@2.x and newer
//             },
//           },
//         ],
//       },
//     ],
//   },
// };

const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';
let target = 'web';
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  // Temporary workaround for 'browserslist' bug that is being patched in the near future
  target = 'browserslist';
}

if (process.env.SERVE) {
  // We only want React Hot Reloading in serve mode
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  // mode defaults to 'production' if not set
  mode: mode,

  // This is unnecessary in Webpack 5, because it's the default.
  // However, react-refresh-webpack-plugin can't find the entry without it.
  entry: './src/index.js',

  output: {
    // output path is required for `clean-webpack-plugin`
    path: path.resolve(__dirname, 'dist'),
    // this places all images processed in an image folder
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: 'asset',

        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: 'babel-loader',
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: plugins,

  target: target,

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // required if using webpack-dev-server
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
