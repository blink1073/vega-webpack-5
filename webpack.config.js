module.exports = {
    entry: "./index.js",
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
}
