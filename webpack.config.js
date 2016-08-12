import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pkg from './package.json';

export default function (options) {

  let CSS_LOADER = options.debug ? 'style-loader!css-loader' : 'style-loader!css-loader?minimize';

  let buildDir = `build/${pkg.name}-${pkg.version}`;

  let defaultConfig = {
    stats: {
      colors: true,
      reasons: options.debug
    },
    cache: false,
    debug: options.debug,
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    }
  };

  let entry = {};
  let app = [];
  let plugins = [];
  app.push('./src/index.web.js');

  plugins.push(new HtmlWebpackPlugin({
    title: options.htmlTitle,
    // favicon: './resources/images/favicon.ico',
    template: './src/templates/index.template.html',
    inject: true
  }));

  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js'
  }));

  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(options.debug ? 'development' : 'production')
  }));

  if (options.debug) {
    app.push(`webpack-dev-server/client?http://${options.host}:${options.port}`);
    app.push('webpack/hot/only-dev-server');

    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
  } else {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    }));

    plugins.push(new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }));

    plugins.push(new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 300
    }));
  }

  entry.app = app;
  entry.style = ['./src/styles/index.less'];

  return Object.assign({}, defaultConfig, {
    entry,

    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[chunkHash].bundle.js',
      path: path.join(__dirname, buildDir)
    },

    devtool: options.debug ? 'source-map' : 'cheap-module-source-map',

    plugins,

    module: {
      preLoaders: [
        {
          test: /\.(js|jsx|es6)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'eslint-loader'
        }
      ],
      loaders: [{
        test: /\.(js|jsx|es6)$/,
        include: path.resolve(__dirname, 'src'),
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.css$/,
        loader: CSS_LOADER
      }, {
        test: /\.less$/,
        include: path.join(__dirname, 'src', 'styles'),
        loader: `${CSS_LOADER}!less-loader`
      }, {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      }, {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      }, {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      }, {
        test: /\.svg/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }, {
        test: /\.(woff|eot|ttf)/,
        loader: 'file-loader'
      }]
    }
  });

};

