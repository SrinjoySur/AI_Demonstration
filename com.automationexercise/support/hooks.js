const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function () {
	// Launch a new browser for each scenario (could be optimized to reuse between scenarios if needed)
	this.browser = await chromium.launch({ headless: true });
	this.context = await this.browser.newContext();
	this.page = await this.context.newPage();
});

After(async function () {
	if (this.browser) {
		await this.browser.close();
	}
});
