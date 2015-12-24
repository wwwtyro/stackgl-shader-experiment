#!/usr/bin/env node
'use strict';

var execFileSync = require('child_process').execFileSync;

var cwd = process.cwd();
var tmp = '/tmp/stackgl-shader-experiment';
var modules = ['budo', 'gl-geometry', 'gl-shader', 'glslify', 'glsl-random'];

execFileSync('rm', ['-rf', tmp], {stdio: 'inherit'});
execFileSync('mkdir', [tmp], {stdio: 'inherit'});
process.chdir(tmp);
execFileSync('npm', ['init', '-y'], {stdio: 'inherit'});
execFileSync('npm', ['install', '--save'].concat(modules), {stdio: 'inherit'});
process.chdir(cwd);
execFileSync('rm', ['-rf', 'deps'], {stdio: 'inherit'});
execFileSync('cp', ['-r', tmp, 'deps'], {stdio: 'inherit'});
