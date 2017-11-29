const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_END || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path:'.env.test'});
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({path:'.env.development'})
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      }],
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.CLOUD_API),
        'process.env.FIREBASE_API_URL': JSON.stringify(process.env.API_URL),
      }),
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },
  };
};
