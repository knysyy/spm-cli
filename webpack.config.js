const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve('./dist'),
        filename: 'index.js',
    },
    entry: './src/index.ts',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    ],
}
