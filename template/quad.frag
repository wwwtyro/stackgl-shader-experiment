#define SHADER_NAME quad.frag

precision highp float;

uniform vec2 uResolution;
uniform float uTime;

#pragma glslify: rand = require(glsl-random)

void main() {
    float n = rand(gl_FragCoord.xy/uResolution + mod(uTime, 1.0));
    gl_FragColor = vec4(n,n,n, 1);
}
