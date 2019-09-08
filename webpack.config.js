const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifest = require('chunk-manifest-webpack2-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const AssetsConfig = require("./src/config/assets.config");

module.exports = {
  devtool: 'source-map',
  entry: AssetsConfig.assets_map,
  output: {
    path: path.join(__dirname, AssetsConfig.build_directory),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [{
          loader: 'babel-loader'
        }],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: [
                {loader: "css-loader", options: {sourceMap: true}}
              ]
            }
        )
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: [
                {loader: "css-loader", options: {sourceMap: true}},
                {loader: "autoprefixer-loader?browsers=last 5 version"},
                'resolve-url-loader',
                {loader: "sass-loader", options: {sourceMap: true}}
              ]
            }
        )
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?.*$|$)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.twig$/,
        use: [
          'raw-loader',
          'twig-html-loader'
        ]
      },
      /*{
        test: /\.html/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/'
          }
        }]
      },*/
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*$|$)/,
        include: [
          path.join(__dirname, "./src/assets/images/nonoptimised")
        ],
        use: [{

          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/nonoptimised/'
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*$|$)/,
        include: [
          path.join(__dirname, "./src/assets/images/svg")
        ],
        use: [{

          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/svg/'
          }
        }]
      },
      {
        test: /\.(png|xml|ico|gif|svg|jpg)(\?.*$|$)/,
        include: [
          path.join(__dirname, "./src/assets/images/favicons")
        ],
        use: [{

          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/favicons/'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor"], // vendor libs https://webpack.js.org/plugins/commons-chunk-plugin/
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.twig'
    }),
    new ChunkManifest({
      filename: "./js/manifest.json",
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/assets/images/sprite'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/assets/images/sprite.png'),
        css: path.resolve(__dirname, 'src/assets/styles/sass/helpers/sprite.scss')
      },
      apiOptions: {
        cssImageRef: "src/assets/images/sprite.png"
      },
      // retina: "@2x" // если есть иконки для ретины
    })
  ]
};
