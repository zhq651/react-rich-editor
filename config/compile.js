import webpack from 'webpack';
import _debug from 'debug';
import config from './webpack.prod.config';

const debug = _debug('app:deploy:webpack-compiler');

const compiler = webpack(config);
compiler.run((err, stats) => {
  const jsonStats = stats.toJson();
  debug('Webpack compile completed.');
  debug(stats.toString());
  if (err) {
    debug('Webpack compiler encountered a fatal error.', err);
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.');
    debug(jsonStats.errors.join('\n'));
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.');
    debug(jsonStats.warnings.join('\n'));
  } else {
    debug('No errors or warnings encountered.');
  }
});
