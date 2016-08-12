/**
 * @author Sean sean.snow@live.com
 */

import webpack from 'webpack';
import config from '../webpack.config';

let bundleConfig = config({
  debug: false
});

webpack(bundleConfig).run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats);
  }
});
