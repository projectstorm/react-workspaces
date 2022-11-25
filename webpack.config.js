const path = require("path");

module.exports = {
  entry: {
    core: path.join(__dirname, 'packages/core/dist/index.js')
  },
  output: {
    path: path.join(__dirname, 'packages'),
    filename: '[name]/dist/index.bundle.js'
  }
};