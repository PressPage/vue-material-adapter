/* eslint quote-props:0 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { VueLoaderPlugin } = require('vue-loader');
// const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === `production`;
const isDevelopment = process.env.NODE_ENV === `development`;

const resolve = relativePath => path.resolve(__dirname, relativePath);

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
      import: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: { postcssOptions: { config: 'postcss.config.js' } },
  },
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      sassOptions: {
        includePaths: [resolve('../node_modules')],
      },
    },
  },
];

const markdown = require('markdown-it')({
  html: true,
  breaks: false,
}).use(require('markdown-it-highlightjs'));

const rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      loaders: ['vue-style-loader'].concat(cssLoaders),
    },
  },

  {
    test: /\.js$/,
    loader: 'esbuild-loader',
    options: {
      target: 'es2019',
    },
  },

  {
    test: /\.md$/,
    use: [
      { loader: 'vue-loader' },
      {
        loader: 'vue-markdown-loader/lib/markdown-compiler',
        options: {
          raw: true,
          preventExtract: true,
          wrapper: 'article',
          markdown,
        },
      },
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
    },
  },
];

const plugins = [
  // new ESBuildPlugin(),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  }),
  new VueLoaderPlugin(),
  // create index.html
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'demo/index.html',
    inject: 'body',
    minify: false,
    chunksSortMode: 'auto',
  }),

  // add vue dependencies
  new WebpackCdnPlugin({
    modules: [
      // {
      //   name: 'vue',
      //   var: 'Vue',
      //   path: isProduction ? 'dist/vue.esm.min.js' : 'dist/vue.esm.js',
      // },
      // {
      //   name: 'vue-router',
      //   var: 'VueRouter',
      //   path: 'dist/vue-router.esm-browser.js',
      // },
    ],
  }),
];

const config = {
  entry: {
    demo: resolve('main.js'),
    // plugin: path.resolve(__dirname, 'components/index.js'),
  },
  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    path: resolve(isProduction ? '../public/vue-material-adapter' : '../dev'),
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
      'vue-material-adapter': resolve(
        '../packages/vue-material-adapter/index.js',
      ),
      demo: resolve('./'),
      '~': resolve('../packages'),
    },
  },
  externals: {},
  devtool: isProduction ? 'source-map' : 'eval-cheap-source-map',
  module: { rules },
  plugins,
};

// Optimize for prod
if (isProduction) {
  config.mode = 'production';

  config.optimization = {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm/npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },

    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2019',
      }),
    ],
  };

  config.output.publicPath = '/vue-material-adapter/';

  // extract css rule
  config.module.rules.push({
    test: /\.(css|scss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {},
      },
    ].concat(cssLoaders),
  });

  // // load css rule
  // config.module.rules.push({
  //   test: /\.(css|scss)$/,
  //   use: ['style-loader'].concat(cssLoaders),
  // });

  config.plugins.push(
    // clean output path
    new CleanWebpackPlugin(),

    // split css
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    }),

    // copy assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.output.path,
          toType: 'dir',
        },
      ],
    }),
  );
}

// Enable dev server
if (isDevelopment) {
  config.mode = 'development';

  // load css rule
  config.module.rules.push({
    test: /\.(css|scss)$/,
    use: ['style-loader'].concat(cssLoaders),
  });

  config.plugins.push(
    // HMR
    new webpack.HotModuleReplacementPlugin(),
    // new FriendlyErrorsWebpackPlugin(),
  );

  config.devServer = {
    contentBase: path.resolve(__dirname, 'static'),
    disableHostCheck: true,
    hot: true,
    quiet: true,
  };

  // cloud9 support
  process.env.IP && (config.devServer.host = process.env.IP);
  process.env.PORT && (config.devServer.port = process.env.PORT);
}

module.exports = config;
