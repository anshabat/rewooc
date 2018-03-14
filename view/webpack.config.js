/* Entry point and output directory are defined by Gulp */
const config = {
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['stage-2', 'react']
                }
            }
        }]
    }
};
module.exports = config;