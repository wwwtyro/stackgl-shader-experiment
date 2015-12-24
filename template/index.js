var Geometry = require('gl-geometry');
var glShader = require('gl-shader');
var glslify = require('glslify');

var canvas = document.createElement('canvas');
canvas.width = canvas.height = 512;
canvas.style.position = 'fixed';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.marginLeft = '-256px';
canvas.style.marginTop = '-256px';
canvas.style.boxShadow = '0px 0px 32px 0px rgba(0,0,0,0.75)'
document.body.appendChild(canvas);

var gl = canvas.getContext('webgl');

var quad = Geometry(gl)
    .attr('aPosition', [
        -1, -1, 0,
         1, -1, 0,
         1,  1, 0,
        -1, -1, 0,
         1,  1, 0,
        -1,  1, 0
    ]);

var program = glShader(gl, glslify('./quad.vert'), glslify('./quad.frag'));

gl.clearColor(1,0,1,1);

function render() {
    requestAnimationFrame(render);
    gl.clear(gl.COLOR_BUFFER_BIT);
    program.bind();
    program.uniforms.uResolution = [512,512];
    program.uniforms.uTime = performance.now()/1000.0;
    quad.bind(program);
    quad.draw();
}

render();
