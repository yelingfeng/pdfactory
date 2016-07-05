var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  debug:true,
  entry: [ 
    './src/main'
  ],
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title : "pdfactory",
      template: path.join(__dirname,'/src/index.html'),
      inject: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin('[hash:8].style.css', { allChunks: true })
  ],
  module: {
    loaders: [
    {   
       test: /\.vue$/,  loader: 'vue'   },
    {
      test: /\.js$/, loader: 'babel',  exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
    }, 
    {
      test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' )
    },
    {
      test: /\.(jpe?g|png|gif|xml)$/i,
      loaders: [
        'url?limit=10000&name=image/[hash:8].[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    },{
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
    }]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  resolve: {
    root: path.resolve(__dirname, 'node_modules'),
    extensions: ['','.js','.vue','.scss','css']
  }
}

