/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const resolvePath = (value) => path.resolve(__dirname, value);

module.exports = {
  mode: 'development',
  entry: './src/entry.tsx',
  devtool: 'inline-source-map',
  output: {
    path: resolvePath('dist'),
    publicPath: "/",
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js','.json','.jsx'],
    alias: {
      '@': resolvePath('src'),
      'images:': resolvePath('src/assets/images'),
      'services:': resolvePath('src/services')
    }
  },
  devServer:{
    host:"0.0.0.0",
     port:8080,
     https:false,
     hot:true,
     disableHostCheck: true,
     proxy:{
       '/':{
         target:'https://company.aibank.jp',
         ws:false,
         changeOrigin:true,
         secure:false,
         headers:{
          Connection: "keep-alive"
         }
       }
     }

  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
        use: {
          loader: 'url-loader',
          options: { 
            name: '[name]_[hash].[ext]', 
            limit:  100000,
          }
        }
       }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('public/index.html'),
    })
  ],
};
