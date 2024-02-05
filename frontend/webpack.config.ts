module.exports = {
    //mode: "production", 
      mode: "development", devtool: "inline-source-map",
  
      entry: [ "./src/App.tsx"/*main*/ ], 
      output: {
          filename: "./bundle.js"  // in /dist
      },
      resolve: {
          extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
      },
      module: {
          rules: [
  
              { test: /\.tsx?$/, loader: "ts-loader" }, 
  
              { test: /\.scss$/, use: [ 
                  { loader: "style-loader" },  
                  { loader: "css-modules-typescript-loader"},  
                  { loader: "css-loader", options: { modules: true } }, 
                  { loader: "sass-loader" },  
              ] }, 
  
          ]
      },
      devServer: {
        proxy: [{
          context: ['/api'],
          target: `http://localhost:3001`,
          changeOrigin: true,
        }],
      }
  }; 