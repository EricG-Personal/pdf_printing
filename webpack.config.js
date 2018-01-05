var path                = require( 'path' );
var HtmlwebpackPlugin   = require( 'html-webpack-plugin' );
var StringReplacePlugin = require( "string-replace-webpack-plugin" );
var CopyWebpackPlugin   = require( 'copy-webpack-plugin' );
var webpack             = require( 'webpack' );
var merge               = require( 'webpack-merge' );


var ROOT_PATH = path.resolve( __dirname );

module.exports = 
{
    entry: path.resolve( ROOT_PATH, 'src/main.jsx' ),

    output: {
        path:     path.resolve( ROOT_PATH, 'build' ),
        filename: 'bundle.js'
    },

    devtool: 'eval-source-map',

    module:
    {
        loaders:
        [
            {
                test:   /\.json$/, 
                loader: 'json-loader'
            },
            {
                test:    /\.jsx?$/,
                loaders: [ 'babel-loader' ],
                include: path.resolve( ROOT_PATH, 'src' ),
                exclude: '/node-modules/'
            },
            {
                test:    /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ]
            },
            {
                // These are all pdfkit-related packages that need to be ran through browserify:
                test: /node_modules\/(pdfkit|unicode-properties|fontkit|png-js|linebreak|unicode-properties|brotli)\//,
                loader: 'transform-loader?brfs',
            }
        ]
    },
    
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 8080
    },

    plugins: [ 
        new HtmlwebpackPlugin(), 
        new webpack.HotModuleReplacementPlugin(),
        new StringReplacePlugin(),
        new CopyWebpackPlugin([
                { from: './src/sample.pdf' }
            ])
    ]

}
