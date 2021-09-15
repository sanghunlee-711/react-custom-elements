// https://medium.com/@JedaiSaboteur/creating-a-react-app-from-scratch-f3c693b84658
// https://typescript-kr.github.io/pages/tutorials/react-&-webpack.html
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';
let target = 'web';
const plugins = [new CleanWebpackPlugin()];

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
  entry: './src/index.tsx',
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
          //웹팩 로더는 한 파일에 대해 여러가지가 실행되는데 배열의 뒤에서부터 앞으로 작동한다.
          'style-loader', // js로 생성된 css를 styles 노드로 생성
          'css-loader', // css 를 js로
          // 'postcss-loader',
          'sass-loader', // sass -> css로 컴파일
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
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
      // 모든 '.js' 출력 파일은 'source-map-loader'에서 다시 처리한 소스 맵에서 존재.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
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
  // Webpack의 출력물에서 디버깅을 하기위해 소스 맵 사용
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  // required if using webpack-dev-server
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  //externals를 사용하게되면 React 가 referenced 되지 않는 에러 발생
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
};
