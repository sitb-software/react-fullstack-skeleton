import webpack, { optimize, DefinePlugin, NoErrorsPlugin } from 'webpack';

import baseConfig, { mainFile, srcPath } from './base.config';

let { DedupePlugin, UglifyJsPlugin, OccurenceOrderPlugin, AggressiveMergingPlugin } = optimize;

let config = Object.assign({}, baseConfig, {
    entry: mainFile,
    cache: false,
    devtool: 'source-map',
    plugins: [
        new DedupePlugin(),
        new DefinePlugin({
            'process.env.NODE_ENV': 'production'
        }),
        new UglifyJsPlugin(),
        new OccurenceOrderPlugin(),
        new AggressiveMergingPlugin(),
        new NoErrorsPlugin()
    ]
});

config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: srcPath
});

export default config;