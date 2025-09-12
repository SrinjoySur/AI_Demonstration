const config = {
  default: {
    require: [
      'features/support/world.js',
      'features/support/hooks.js',
      'features/step_definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      '@cucumber/pretty-formatter'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    dryRun: false,
    failFast: false,
    strict: true,
    worldParameters: {
      headless: process.env.HEADLESS !== 'false',
      slowMo: process.env.SLOW_MO || 0,
      timeout: process.env.TIMEOUT || 30000,
      baseUrl: process.env.BASE_URL || 'https://automationexercise.com'
    }
  },
  smoke: {
    tags: '@smoke and not @skip',
    parallel: 2
  },
  regression: {
    tags: '@regression and not @skip',
    parallel: 4
  },
  ci: {
    tags: 'not @skip and not @manual',
    parallel: 4,
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ]
  }
};

module.exports = config;