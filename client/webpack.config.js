    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    let config = {
        entry: './src/index.js',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },

        devServer: {
            port: 3000,
            static: {
                directory: path.join(__dirname, 'src'),
            },
        },
        resolve: {
            extensions: ['.js', '.jsx', ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.m\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: "[local]__[hash:base64:5]"
                                }
                            }
                        }
                    ]
                },
                {
                    test: /^((?!\.m).)*css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                }
            ]
        }
    }

    module.exports = (env, options) => {
        let isProd = options.mode === 'production'
        config.devtool = isProd ? false : 'eval-cheap-module-source-map'
        return config
    }
