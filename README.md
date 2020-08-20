# Error in webpack 5 compiling vega

This repository reproduces an issue we have compiling a generator function with webpack 5.0.0-beta.27 (and previous betas) in production mode. Compiling with webpack 4.44.1 succeeds, and compiling with webpack 5.0.0-beta.27 in development mode succeeds.

```sh
yarn
yarn build # successful in webpack 4.44.1 and 5.0.0-beta.27
yarn build:prod # successful in webpack 4.44.1, error in webpack 5.0.0-beta.27
```

We have manually forced `terser-webpack-plugin` to be `^4` using the yarn resolutions metadata in package.json, so `terser` is 5.2.0 and `terser-webpack-plugin` is 4.1.0.

The error we are seeing in webpack 5.0.0-beta.27 (`yarn run build:prod` above) is:

```sh
ERROR in main.js from Terser
Unexpected token operator «*», expected punc «(» [main.js:3,64]
    at js_error (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:538:11)
    at croak (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1251:9)
    at token_error (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1259:9)
    at expect_token (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1272:9)
    at expect (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1275:36)
    at parameters (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1771:9)
    at _function_body (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:2049:19)
    at function_ (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1698:20)
    at statement (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1439:24)
    at _embed_tokens_wrapper (/[snip]/vega-webpack-5/node_modules/terser/dist/bundle.min.js:1309:26)
```

Here is the function we are compiling:

```js
export default function*() {
  for (let i=0; i<10; i++) {
    yield i;
  }
}
```

