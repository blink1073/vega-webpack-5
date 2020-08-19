# Error in webpack 5 compiling vega

This repository reproduces an issue we have compiling vega with webpack 5.0.0-beta.27 (and previous betas) in production mode. Compiling with webpack 4.44.1 succeeds, and compiling with webpack 5.0.0-beta.27 in development mode succeeds.

```sh
yarn
yarn build # successful in webpack 4.44.1 and 5.0.0-beta.27
yarn build:prod # successful in webpack 4.44.1, error in webpack 5.0.0-beta.27
```

The error we are seeing in webpack 5.0.0-beta.27 (`yarn run build:prod above) is:

```sh
ERROR in ./node_modules/vega/index.js + 950 modules
Unexpected token (1:71)
| /* harmony default export */ function __WEBPACK_MODULE_DEFAULT_EXPORT__*(values, valueof) {
|   if (valueof == null) {
|     for (let value of values) {
while analysing module /[snip]/vega-webpack-5/node_modules/vega-statistics/src/numbers.js for concatenation
```

It seems that the problem is in https://github.com/vega/vega/blob/v5.14.0/packages/vega-statistics/src/numbers.js, which is fairly small:

```js
export default function*(values, valueof) {
  if (valueof == null) {
    for (let value of values) {
      if (value != null && value !== '' && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      value = valueof(value, ++index, values);
      if (value != null && value !== '' && (value = +value) >= value) {
        yield value;
      }
    }
  }
}
```

Perhaps for some reason webpack is incorrectly parsing the default export of a generator function when in production mode?
