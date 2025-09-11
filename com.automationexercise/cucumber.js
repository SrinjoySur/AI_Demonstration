module.exports = {
  default: {
    require: [
      'steps/**/*.js',
      'support/hooks.js',
      'support/world.js'
    ],
    format: [
      'progress',
      'json:cucumber-report.json',
      'html:cucumber-report.html'
    ],
    publishQuiet: true,
    paths: [
      'features/**/*.feature'
    ],
    worldParameters: {
      baseUrl: 'https://automationexercise.com'
    }
  }
};
