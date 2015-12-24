#!/usr/bin/env node
'use strict';

var FULL_INSTALL = process.argv.indexOf('--full') > -1;

var path = require('path');
var fs = require('fs');
var log = require('color-logs')(true, false, 'stackgl-shader-experiment');
var copyDirSyncRecursive = require('wrench').copyDirSyncRecursive;

var execFileSync = require('child_process').execFileSync;

log.info('Creating package.json...')
try {
    execFileSync('npm', ['init', '-y']);
} catch (e) {
    log.error(e.toString());
    log.error('Error creating package.json. Aborting.')
    process.exit(1);
}

log.info('Adding start script...');
try {
    var pkg = path.join(process.cwd(), 'package.json');
    var data = fs.readFileSync(pkg).toString();
    data = JSON.parse(data);
    data.scripts.start = 'budo --live index.js -- -t glslify';
    data = JSON.stringify(data, null, 2);
    fs.writeFileSync(pkg, data);
} catch (e) {
    log.error(e.toString());
    log.error('Error adding start script. Aborting.')
    process.exit(1);
}

if (FULL_INSTALL) {
    log.info('Installing modules from npm...')
    try {
        execFileSync('npm', [
            'install', '--save', '--silent',
            'budo',
            'gl-geometry',
            'gl-shader',
            'glslify',
            'glsl-random'
        ], {stdio: 'inherit'});
    } catch (e) {
        log.error(e.toString());
        log.error('Error installing modules from npm. Aborting.')
        process.exit(1);
    }
} else {
    log.info('Installing modules from cache...');
    try {
        var depPath = path.join(__dirname, 'deps');
        var pkgData = fs.readFileSync(path.join(depPath, 'package.json')).toString();
        var dependencies = JSON.parse(pkgData).dependencies;
        var localPkgPath = path.join(process.cwd(), 'package.json');
        var data = fs.readFileSync(localPkgPath).toString();
        data = JSON.parse(data);
        data.dependencies = dependencies;
        data = JSON.stringify(data, null, 2);
        fs.writeFileSync(localPkgPath, data);
        copyDirSyncRecursive(path.join(depPath, 'node_modules'), path.join(process.cwd(), 'node_modules'));
    } catch (e) {
        log.error(e.toString());
        log.error('Error installing modules from cache. Aborting.')
        process.exit(1);
    }
}

log.info('Generating boilerplate...');
try {
    var filenames = ['index.js', 'quad.vert', 'quad.frag'];
    filenames.map(function(filename) {
        var src = path.join(__dirname, 'template', filename);
        var dst = path.join(process.cwd(), filename);
        var data = fs.readFileSync(src);
        fs.writeFileSync(dst, data);
    });
} catch (e) {
    log.error(e.toString());
    log.error('Error adding generating boilerplate. Aborting.')
    process.exit(1);
}

console.log('\n\nDone. Run "npm start" to start a live reload server and begin experimenting.\n');
