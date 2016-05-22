module.exports = [{
  context: __dirname,
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'index.js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx|es6)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
      },
    },
    {
      test: /\.css$/,
      loader: 'style!css',
    }],
  },
}];
