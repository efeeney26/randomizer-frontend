const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
    NODE_ENV = 'development'
} = process.env

const isProduction = NODE_ENV === 'production'

module.exports = {
    mode: NODE_ENV,
    entry: path.resolve(__dirname, 'src/index.tsx'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset',
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
        chunkFilename: '[name].[contenthash].js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
    ],
    devtool: isProduction ? false : 'eval-cheap-module-source-map',
    devServer: {
        port: 3000
    },
}
