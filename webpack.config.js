const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'server.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
