const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env, argv) {
    return {
        entry: {
            main: './src/BGPlus.js',
            popup: './src/popup.js',
            background: './src/background.js'
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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: require('sass')
                        }
                    }
                ]
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
        },
        plugins: [
            new MiniCssExtractPlugin()
        ]
    };
};
