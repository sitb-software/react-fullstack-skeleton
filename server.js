/*eslint no-console:0 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), config.devServer);

server.listen(config.port, 'dev.sitb.software', function (err) {
    if (err) {
        console.error(err);
    }
    console.log('Listening at localhost:' + config.port);
    console.log('Opening your system browser...');
});
