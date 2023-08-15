const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Definition of paths for source and output files, and file size limits for images and fonts
const environment = {
  paths: {
    source: path.resolve(__dirname, './src/'),
    output: path.resolve(__dirname, './dist/'),
  },
  limits: {
    images: 8192,
    fonts: 8192,
  },
};

module.exports = {
  // Entry point of the application
  entry: {
    app: path.resolve(environment.paths.source, 'index.js'),
  },
  // Output configuration of the application
  output: {
    filename: '[name].js',
    path: environment.paths.output,
  },
  // Specifies the environment in which the output code will run
  target: 'web',
  module: {
    rules: [
      // Transforms HTML files into strings for inclusion in the output bundle
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // Transpiles JavaScript files using Babel, excluding files in node_modules
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Processes CSS files and includes them in the output bundle
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // Processes image files and includes them in the output bundle
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name].[hash:6][ext]',
        },
      },
      // {
      //   test: /\.(eot|ttf|woff|woff2)$/,
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: environment.limits.images,
      //     },
      //   },
      //   generator: {
      //     filename: 'fonts/[name].[hash:6][ext]',
      //   },
      // },
    ],
  },
  plugins: [
    // Generates an HTML file that includes all output bundles
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(environment.paths.source, 'app/pages/index.html'),
      favicon: path.resolve(environment.paths.source, 'assets', 'favicon.ico'),
    }),
    // Extracts CSS into separate files for each JS file that contains CSS
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css',
    }),
  ],
};
