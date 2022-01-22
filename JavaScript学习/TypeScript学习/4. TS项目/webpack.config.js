const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  // 入口
  entry: './src/index.ts',

  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction: false
    }
  },

  // 指定要使用的loader
module: {
  rules: [
    {
      test: /\.ts$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  "chrome": '88',
                  "ie": "9"
                },
                "corejs": "3",
                "useBuiltIns": 'usage'
              },
            ]
          ]
        }
      }, 'ts-loader'],
      exclude: /node_modules/,
    },

    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  'postcss-preset-env',
                  {
                    browsers: 'last 2 versions'
                  }
                ],
              ]
            }
          }
        },
        'sass-loader'
      ]
    }
  ]
},
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  }
}