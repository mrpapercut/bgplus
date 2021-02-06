const path = require('path');

module.exports = function(env, argv) {
    return {
        entry: {
            main: './src/BGPlus.js',
            popup: './src/popup.js',
            background: './src/background.js',
            mainCSS: './src/css/main.scss',
            darkmodeCSS: './src/css/darkmode.scss'
        },
        mode: env && env.production ? 'production' : 'development',
        devtool: env && env.production ? false : 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            chunkFilename: '[name].chunk.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.scss$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].css'
                    }
                }, {
                    loader: 'extract-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: env && env.production
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: env && env.production,
                        implementation: require('sass')
                    }
                }]
            }, {
                test: /\.(woff2|ttf|png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }]
        },
        performance: {
            hints: false
        }
    };
};
