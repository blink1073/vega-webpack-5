module.exports = {
    entry: "./index.js",

    // Adding @babel/core, @babel/preset-env, and babel-loader to dev
    // dependencies, and uncommenting the config below, makes webpack
    // 5.0.0-beta.27 compile successfully in production mode.

    /*
    module: {
        rules: [{
            test: /vega-statistics\/src\/numbers.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        }]
    }
    */
}
