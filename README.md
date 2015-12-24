# stackgl-shader-experiment

Generates boilerplate for experimenting with a fragment shader.

## Install

```sh
npm install -g stackgl-shader-experiment
```

## Use

Create a new directory for your experiment, then run

```sh
stackgl-shader-experiment
```

`stackgl-shader-experiment` will download dependencies and generate boilerplate
code for your experiment. To kick off a live reload server for your experiment,
simply run `npm start`. Then visit http://localhost:9966 in your browser.

The fragment shader being executed can be found in `quad.frag`. Edit this file,
save it, and it will be reloaded in your browser automatically.

`index.js` contains the boilerplate webgl code for running the experiment. By
default, it provides the uResolution and uTime uniforms to the shader, and runs
in a `requestAnimationFrame` loop.
