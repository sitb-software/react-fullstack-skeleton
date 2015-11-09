/*eslint-disable no-var */
'use strict';
require('babel/register');
var path = require('path');

var args = require('minimist')(process.argv.slice(2));

// List of allowed environments
var allowedEnvs = ['dev', 'dist', 'test'];

// Set the correct environment
var env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
    env = 'test';
} else if (args.env) {
    env = args.env;
} else {
    env = 'dev';
}

// Get available configurations
var configs = {
    base: require(path.join(__dirname, 'webpack/base.config')),
    dev: require(path.join(__dirname, 'webpack/dev.config')),
    dist: require(path.join(__dirname, 'webpack/dist.config'))
};

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv(env) {
    var isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
    return isValid ? env : 'dev';
}


/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig(env) {
    var usedEnv = getValidEnv(env);
    return configs[usedEnv];
}

module.exports = buildConfig(env);