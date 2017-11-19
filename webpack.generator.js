const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class WebpackGenerator {
  constructor() {
    this.init();
  }
  
  init() {
    this.fileNames = fs.readdirSync('./pages');
  }

  get entry() {
    let entry = {};

    for (let name of this.fileNames) {
      Object.assign(entry, {[name]: './pages/' + name + '/app.js'});
    }
    return entry;
  }

  get pluginSet() {
    return this.fileNames.map((name) => {
      return new HtmlWebpackPlugin({
        filetype: 'pug',
        filename: '../views/' + name + '.jade',
        template: `./pages/${name}/${name}.pug`,
        chunks: [name],
      });
    });
  }
}

module.exports = WebpackGenerator;
