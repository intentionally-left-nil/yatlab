process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const config = require('react-scripts/config/webpack.config.dev.js');

let entry = config.entry;
let plugins = config.plugins;

entry = entry.filter(fileName => !fileName.match(/webpackHotDevClient/));
plugins = plugins.filter(plugin => !(plugin instanceof webpack.HotModuleReplacementPlugin));

config.entry = entry;
config.plugins = plugins;

// set the output location to /build to match prod
config.output.path = paths.appBuild;

// Determine if we want to build or watch
const watch = process.argv[2] === '--watch';
const compiler = webpack(config);

watch ? compiler.watch({}, buildCallback) : compiler.run(buildCallback);

function buildCallback(err, stats) {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
}

function copyPublicFolder() {
  console.log(`copying files ${paths.appPublic}, ${paths.appBuild}`);
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}
