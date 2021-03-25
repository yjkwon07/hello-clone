import path from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.d.ts'], // babel이 처리할 확장자 목록
    alias: {
      // 절대경로, 바벨이 경로를 보고 바꿔주는용. tsconfig는 단지 타이핑 체크 용
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@API': path.resolve(__dirname, 'src/API'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@typings': path.resolve(__dirname, 'src/typings'),
    },
  },
  entry: {
    app: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              // It is suggested to run both `react-refresh/babel` and the plugin in the `development` mode only,
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 여러 css를 하나의 css 파일로 생성
            options: {
              publicPath: path.join(__dirname, 'src/assets'),
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000, // * 이 값보다 작은 경우에는 번들 파일에 파일의 내용을 포함시킨다.
            name: 'static/media/[name].[hash:8].[ext]',
            // fallback 옵션을 입력하지 않으면 기본적으로 file-loader가 처리하게 된다.
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false, // type check와 webpack을 동시에 실행
    }),
    // process.env.NODE_ENV 접근하기
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      hash: true,
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // * 동적 임포트만 코드를 분할하도록 설정되어 있다.
      minSize: 10, // * 파일 크기가 30kb 이상인 모듈만 분할 대상으로 한다.
      minChunks: 1, // * 한 개 이상의 청크(chunk)에 포함되어 있어야 한다.
      cacheGroups: {
        // * 파일 분할은 그룹별로 이루어진다. 기본적으로 외부 모듈(venders)과 내부 모듈(default) 두 그룹으로 설정되어 있다.
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          name: 'venders',
        },
        reactBundle: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react.bundle',
          priority: 2,
          minSize: 100,
        },
        default: {
          minChunks: 1, // * 내부 모듈은 두 개 이상의 번들 파일에 포함되어야 분할된다.
          priority: 3,
          name: 'default',
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, 'dist'), // 실제 경로
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true, // react router
    port: 3090,
    contentBase: path.join(__dirname, 'dist'),
    // proxy: {
    //   '/api/': {
    //     target: 'http://localhost:3095',
    //     changeOrigin: true,
    //   },
    // },
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
}
if (!isDevelopment && config.plugins) {
  // config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;
