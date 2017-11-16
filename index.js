const sourceMapUrl = require('source-map-url')
module.exports = class InlineScriptWebpackPlugin {
  constructor(options) {

    this.options = options || {}
  }

  apply(compiler) {

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
        const name = this.options.name
        const names = this.options.names
        let inlines = []
        const scripts = []
        if (name && names) {
          throw new Error('[InlineScriptWebpackPlugin]: name is invalid with names')
        } else if (name) {
          if (/^[a-zA-Z]/g.test(name)) {
            inlines.push(name)
          } else {
            throw new Error('[InlineScriptWebpackPlugin]: value type of name option must be string')
          }
        } else if (names) {
          if (names instanceof Array) {
            inlines = [].concat(names)
          } else {
            throw new Error('[InlineScriptWebpackPlugin]: value type of names option must be array')
          }
        } else {
          inlines.push('inline')
        }


        const assets = htmlPluginData.assets
        const inlineChunks = compilation.chunks.filter(chunk => inlines.indexOf(chunk.name) > -1) || []

        if (inlineChunks.length > 0) {
          for (let inlineChunk of inlineChunks) {
            let file = inlineChunk.files[0]
            if (compilation.assets[file]) {
              let asset = compilation.assets[file]
              scripts.push({name: inlineChunk.name, source: `<script>${sourceMapUrl.removeFrom(asset.source())}</script>`})

              let index = assets.js.indexOf(assets.publicPath + file)
              if (index >= 0) {
                assets.js.splice(index, 1)
                delete assets.chunks.manifest
              }
            }

          }
        }

        if (scripts.length > 0) {
          for (let script of scripts) {
            let name = script.name === 'manifest' ? 'webpackManifest' : script.name
            assets[name] = script.source
          }
        }
        callback && callback(null, htmlPluginData)
      })
    })
  }
}
