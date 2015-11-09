import webpack, { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack';
import baseConfig, { mainFile, srcPath } from './base.config';


let config = Object.assign({}, baseConfig, {
    entry: [
        'webpack-dev-server/client?http://dev.sitb.software:3000',
        'webpack/hot/only-dev-server',
        mainFile
    ],
    cache: true,
    devtool: 'inline-source-map',
    plugins: [
        new HotModuleReplacementPlugin(),
        new NoErrorsPlugin()
    ]
});

config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'react-hot!babel-loader',
    include: srcPath
});

export default config;
