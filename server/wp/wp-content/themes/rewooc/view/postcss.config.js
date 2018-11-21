module.exports = () => {
    return {
        plugins: {
            'autoprefixer':  {
                browsers: ['last 4 versions', 'ie > 8', '> 1%']
            },
            'postcss-nested': {}
        }
    }
};