import path from 'path';

export default () => ({
  entry: [
    path.join(__dirname, 'components/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //       filename: 'index.html',
  //       template: './src/index.html'
  //   }),
  // ]
  module: {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [["es2015", {"modules": false}], "react"],
            plugins: ['react-css-modules']
          },

        }
      ]
    },
    {
      test: /\.(css|less)$/,
      loader: 'style-loader!css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]!less-loader',
    },
  ]
},
});
