/**
 * @author Sean sean.snow@live.com
 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';
import minimist from 'minimist';


const argv = minimist(process.argv.slice(2));
const DEBUG = !argv.release;

let host = '0.0.0.0';
let port = 3000;
let api = 'http://127.0.0.1:5000';

if (argv.host) {
  host = argv.host;
}
if (argv.port) {
  port = argv.port;
}
if (argv.api) {
  api = argv.api;
}

let serverConfig = config({
  host,
  port,
  debug: DEBUG,
  htmlTitle: 'React Full Stack Skeleton'
});

let server = new WebpackDevServer(webpack(serverConfig), {
  contentBase: serverConfig.output.path,
  hot: true,
  historyApiFallback: true,
  stats: serverConfig.stats,
  proxy: {
    '*': api
  }
});

server.listen(port, host, err => {
  if (err) {
    return console.log(err);
  }
});
