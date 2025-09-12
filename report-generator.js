const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber_report.json',
  output: 'cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Test",
    "Browser": "Chrome",
    "Platform": "Web",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);