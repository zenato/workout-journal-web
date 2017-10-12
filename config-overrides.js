const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = function override(config, env) {
  const modules = config.module.rules.filter(r => r.oneOf)[0].oneOf;

  // Enable SCSS
  modules.unshift({
    test: /\.scss$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          minimize: env === 'production',
          sourceMap: env === 'production',
          // Enable CSS modules.
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          includePaths: ['src/styles'],
        },
      },
    ],
  });

  // Development
  if (env === 'development') {
    config.entry.unshift('react-hot-loader/patch');
    // Patch react hot loader
    modules.filter(o => o.loader && o.loader.includes('babel-loader'))[0].options.plugins = ['react-hot-loader/babel'];
  }

  // Production
  if (env === 'production') {
    if (config.entry.length !== 2) {
      throw new Error('Changed entry config.');
    }

    config.entry = {
      vendor: [
        config.entry[0],
        'react',
        'react-dom',
        'react-router-dom',
        'lodash',
      ],
      app: config.entry[1],
    };
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(
      /^pages$/,
      'pages/index.async.js',
    ));
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }));
  }

  return config;
};
