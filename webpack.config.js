const path = require('path');

module.exports = {
    entry: ['./css/SentimentAnalysisControl.scss'],
    output: {
        path: path.resolve(__dirname, "css")

    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'css/[name].css'
                    }
                },
                {
                    loader: 'extract-loader'
                }, {
                    loader: 'css-loader?-url'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader'
                }
            ]
        }]
    }
}