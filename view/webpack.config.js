/* Entry point and output directory are defined by Gulp */
const path = require('path');

module.exports = () => {
    return ({
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
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                }
            ]
        }
    });
};