const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const paths = require('react-scripts/config/paths')

const getClientEnvironment = require('react-scripts/config/env')
const env = getClientEnvironment(paths.publicUrl)

const localPaths = require('./paths')

module.exports = {
  entry: localPaths.serverRenderJs,
  target: 'node',
  output: {
    path: localPaths.server,
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        exclude: [/\.(js|jsx)$/, /\.json$/, /\.scss$/],
        loader: 'ignore',
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          presets: 'react-app',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: require.resolve('css-loader/locals'),
            options: {
              importLoaders: 1,
              // Enable CSS modules.
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              includePaths: [localPaths.styles],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
}
