import path from 'path';

let port = 3000;
let srcPath = path.join(__dirname, '/../src');
let publicPath = '/assets/';
let mainFile = srcPath + '/app';

let config = {
    port: port,
    debug: true,
    output: {
        path: path.join(__dirname, '/../__build__/assets'),
        filename: 'app.js',
        publicPath: publicPath
    },
    devServer: {
        contentBase: './src/',
        historyApiFallback: true,
        hot: true,
        port: port,
        publicPath: publicPath,
        noInfo: false,
        stats: {
            colors: true
        }
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            actions: srcPath + '/actions/',
            components: srcPath + '/components/',
            stores: srcPath + '/stores/',
            styles: srcPath + '/styles/'
        }
    },
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            include: srcPath,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.styl/,
            loader: 'style-loader!css-loader!stylus-loader'
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
            test: /\.(woff|woff2|eot|ttf)/,
            loader: 'url-loader?limit=8192'
        }]
    }
};

export { mainFile, srcPath, publicPath, config as default }