/* Entry point and output directory are defined by Gulp */
const path = require('path');
const ETP = require('extract-text-webpack-plugin');

module.exports = () => {
    return ({
        devtool: 'cheap-module-source-map',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
            publicPath: 'build/'
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css?$/,
                    use: ETP.extract(['css-loader', 'postcss-loader'])
                }
            ]
        },
        plugins: [
            new ETP('styles.css'),
        ]
    });
};