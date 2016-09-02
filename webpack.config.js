import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import pkg from './package.json';

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildDir = `build/${pkg.name}-${pkg.version}`;

export default function (options) {
  let entry = {};
  let app = [];
  let plugins = [];
  let externals = {};
  app.push('./src/index.web.js');

  plugins.push(new HtmlWebpackPlugin({
    title: options.htmlTitle,
    // favicon: './resources/images/favicon.ico',
    template: './src/templates/index.template.js',
    debug: options.debug,
    inject: true
  }));

  plugins.push(new ExtractTextPlugin('stylesheet/[name].css'));

  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'js/commons.js'
  }));

  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': options.debug ? '"development"' : '"production"'
  }));

  if (options.debug) {
    app.push(`webpack-dev-server/client?http://${options.host}:${options.port}`);
    app.push('webpack/hot/dev-server');

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

    plugins.push(new CopyWebpackPlugin([{
      from: `${nodeModulesPath}/react/dist/react.min.js`,
      to: 'js/react.min.js'
    }, {
      from: `${nodeModulesPath}/react-dom/dist/react-dom.min.js`,
      to: 'js/react-dom.min.js'
    }]));

    externals.react = 'React';
    externals['react-dom'] = 'ReactDOM';
  }

  entry.app = app;

  return {
    entry,
    output: {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[chunkHash].bundle.js',
      path: path.join(__dirname, buildDir)
    },
    stats: {
      colors: true,
      reasons: options.debug
    },
    cache: false,
    debug: options.debug,
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', 'css', 'less', 'sass', 'png', 'jpg', 'jpeg'],
      alias: {
        react: path.join(nodeModulesPath, '/react'),
        'react-dom': path.join(nodeModulesPath, '/react-dom')
      }
    },
    externals,

    devtool: options.debug ? 'source-map' : 'cheap-module-source-map',

    plugins,

    module: {
      preLoaders: [
        {
          test: /\.(js|jsx|es6)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: path.resolve(__dirname, 'src/templates'),
          loader: 'eslint-loader'
        }
      ],
      loaders: [{
        test: /\.(js|jsx|es6)$/,
        include: [path.resolve(__dirname, 'src')],
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /\.less$/,
        include: path.join(__dirname, 'src', 'styles'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
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
  };
}
