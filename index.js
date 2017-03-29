#!/usr/bin/env node
'use strict';

var path = require('path');
var fs = require('fs');
var log = require('color-logs')(true, false, 'stackgl-shader-experiment');

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
    data.scripts.start = 'budo index.js --live -- -t glslify';
    data = JSON.stringify(data, null, 2);
    fs.writeFileSync(pkg, data);
} catch (e) {
    log.error(e.toString());
    log.error('Error adding start script. Aborting.')
    process.exit(1);
}

log.info('Installing dependencies...')
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
