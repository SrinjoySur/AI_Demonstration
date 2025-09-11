const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');

class CustomWorld {
	constructor(options) {
		this.parameters = options.parameters || {};
		this.baseUrl = this.parameters.baseUrl || 'https://automationexercise.com';
		this.browser = null;
		this.context = null;
		this.page = null;
	}

	async goto(pathname = '/') {
		if (!this.page) throw new Error('Page not initialized. Did the Before hook run?');
		const url = pathname.startsWith('http') ? pathname : this.baseUrl.replace(/\/$/, '') + pathname;
		await this.page.goto(url);
	}
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);

module.exports = { CustomWorld };
