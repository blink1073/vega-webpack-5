# Error in webpack 5 compiling vega

This repository reproduces an issue we have compiling a generator function with webpack 5.0.0-beta.27 (and previous betas) in production mode. Compiling with webpack 4.44.1 succeeds, and compiling with webpack 5.0.0-beta.27 in development mode succeeds.

```sh
yarn
yarn build # successful in webpack 4.44.1 and 5.0.0-beta.27
yarn build:prod # successful in webpack 4.44.1, error in webpack 5.0.0-beta.27
```

The error we are seeing in webpack 5.0.0-beta.27 (`yarn run build:prod` above) is:

```sh
ERROR in main.js from Terser
Unexpected token operator «*», expected punc «(» [main.js:3,64]
    at ee (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:19541)
    at c (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:28244)
    at l (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:28335)
    at p (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:28475)
    at _ (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:28587)
    at /[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:38014
    at x (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:38144)
    at F (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:34820)
    at /[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:32263
    at /[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1:28976
```

Here is the function we are compiling:

```js
export default function*() {
  for (let i=0; i<10; i++) {
    yield i;
  }
}
```

We see the error with `terser` 4.8.0 and `terser-webpack-plugin` 3.1.0.

If I change the webpack version in `package.json` to `^4`, `yarn run build:prod` now works, and the generated file contains the generator function. In this case, `terser` 4.8.0 is still installed, but `terser-webpack-plugin` is downgraded to 1.4.5.
