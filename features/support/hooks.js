const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

// Create screenshots directory if it doesn't exist
BeforeAll(async function() {
  const screenshotsDir = path.join(__dirname, '../../screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
});

// Initialize browser before each scenario
Before(async function() {
  await this.init();
});

// Close browser after each scenario
After(async function(scenario) {
  // Take screenshot if scenario failed
  if (scenario.result.status === 'FAILED' && this.page) {
    const screenshotName = `${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.png`;
    const screenshotPath = path.join(__dirname, '../../screenshots', screenshotName);
    
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    
    // Attach screenshot to report
    const screenshot = fs.readFileSync(screenshotPath);
    this.attach(screenshot, 'image/png');
  }
  
  // Close browser
  await this.close();
});

// Cleanup after all tests
AfterAll(async function() {
  // Additional cleanup if needed
});