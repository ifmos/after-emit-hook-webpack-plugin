module.exports = class AfterEmitHookWebpackPlugin {
	constructor(options) {
		this.options = options || {}
		if (typeof(this.options.callback) !== 'function') {
			this.options.callback = () => {
				console.log('callback function is not defined')
			}
		}
	}

	apply(compiler) {
		compiler.plugin('after-emit', this.options.callback.bind(this, compiler))
	}
}