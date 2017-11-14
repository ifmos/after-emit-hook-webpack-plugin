module.exports = class InlineScriptWebpackPlugin {
  constructor(options) {

    this.options = options || {}
  }

  apply(compiler) {

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
        const name = this.options.name
        const names = this.options.names
        if (name && names) {
          throw new Error('[InlineScriptWebpackPlugin]: name is invalid with names')
        } else if (name) {

        } else if (names) {

        } else {
          throw new Error('[InlineScriptWebpackPlugin]: a name should be given at least')
        }


        const assets = htmlPluginData.assets


        callback && callback()
      })
    })
  }
}