const path = require('path');

// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有配置信息都应该写在module.exports中
module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  mode: 'production',
  // 指定输出位置
output: {
  // 指定打包后的目录
  path: path.resolve(__dirname, 'dist'),
  //打包后的文件名
  filename: 'bundle.js',
  environment: {
    arrowFunction:false,
  }
},

  // 指定要使用的loader
  module: {
    // 指定加载的规则
    rules: [
      {
        test: /\.ts$/,
        // use: ['babel-loader','ts-loader'], 但还可以写一些配置信息
        use: [
          {
            loader: 'babel-loader', // 指定加载器
            options: { //设置babel
              // 指定预定义环境
              presets: [
                ['@babel/preset-env', //指定环境的插件
                {
                  // 指定需要兼容的浏览器版本
                  targets: {
                    "chrome": '88',
                    "ie":'9',
                  },               
                  "corejs": "3", //指定corejs的版本
                  // 使用coreJS的方式，usage表示按需加载
                  "useBuiltIns":'usage'
                }]
              ]
              
            }
          }
          , 'ts-loader'],
        // 要排除的文件夹
        exclude: /node-modules/
      }
    ]
  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      // title: '自定义title',
      template: './src/template.html', //以某某文件为模板来生成html文件
    }),
    new CleanWebpackPlugin(),
  ],
  // 指明哪些文件可以作为模块导入
  resolve: {
    extensions: ['.ts', '.js'], //以.ts和.js结尾的文件可以作为模块
  }
}

