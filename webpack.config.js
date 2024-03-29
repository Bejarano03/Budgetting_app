// Setting up requirements
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

// Setting up entry for the app
const config = {
    entry: {
        app: "/public/index.js",
    },

    // Creating /dist
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
    },

    // Setting up modules
    mode: 'development',
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
            },
        },
        ],
    },
    plugins: [
        new WebpackPwaManifest({
          fingerprints: false,
          name: 'Newsy app',
          short_name: 'Newsy',
          description: 'An application that allows you to view different news articles and save your favorites.',
          background_color: '#01579b',
          theme_color: '#ffffff',
          'theme-color': '#ffffff',
          start_url: '/',
          icons: [
            {
              src: path.resolve('assets/images/icons/android-chrome-192x192.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('assets', 'icons'),
            },
          ],
        }),
    ],
    
};

module.exports = config;