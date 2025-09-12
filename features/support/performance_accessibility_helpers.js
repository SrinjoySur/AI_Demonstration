/**
 * Helper functions for performance and accessibility testing
 */

/**
 * Calculates the color contrast ratio between two colors
 * @param {string} color1 - The first color in RGB format (rgb(r, g, b))
 * @param {string} color2 - The second color in RGB format (rgb(r, g, b))
 * @returns {number} - The contrast ratio
 */
function calculateContrastRatio(color1, color2) {
  // Extract RGB values
  const rgb1 = color1.match(/\d+/g).map(Number);
  const rgb2 = color2.match(/\d+/g).map(Number);
  
  // Calculate relative luminance
  const luminance1 = calculateRelativeLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const luminance2 = calculateRelativeLuminance(rgb2[0], rgb2[1], rgb2[2]);
  
  // Calculate contrast ratio
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculates the relative luminance of an RGB color
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} - The relative luminance
 */
function calculateRelativeLuminance(r, g, b) {
  // Convert RGB to sRGB
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  
  // Calculate luminance
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
  
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Simulates network conditions
 * @param {Object} page - The Playwright page object
 * @param {string} networkType - The type of network to simulate ('slow3G', 'fast3G', 'offline')
 * @returns {Promise<void>} - A promise that resolves when the network condition is set
 */
async function simulateNetworkCondition(page, networkType) {
  const conditions = {
    'slow3G': {
      download: 500 * 1024 / 8, // 500 kbps
      upload: 500 * 1024 / 8,   // 500 kbps
      latency: 100              // 100 ms
    },
    'fast3G': {
      download: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
      upload: 750 * 1024 / 8,          // 750 kbps
      latency: 40                       // 40 ms
    },
    'offline': {
      offline: true
    }
  };
  
  if (networkType === 'offline') {
    await page.context().setOffline(true);
  } else {
    const condition = conditions[networkType] || conditions['fast3G'];
    await page.context().route('**/*', route => {
      setTimeout(() => route.continue(), condition.latency);
    });
  }
}

/**
 * Collects performance metrics from the page
 * @param {Object} page - The Playwright page object
 * @returns {Promise<Object>} - A promise that resolves to an object with performance metrics
 */
async function collectPerformanceMetrics(page) {
  return page.evaluate(() => {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const paintEntries = performance.getEntriesByType('paint');
    
    return {
      // Navigation Timing API metrics
      navigationTiming: {
        domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime,
        load: navigationEntry.loadEventEnd - navigationEntry.startTime,
        domInteractive: navigationEntry.domInteractive - navigationEntry.startTime,
        firstByte: navigationEntry.responseStart - navigationEntry.startTime,
        dns: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
        connection: navigationEntry.connectEnd - navigationEntry.connectStart,
        request: navigationEntry.responseStart - navigationEntry.requestStart,
        response: navigationEntry.responseEnd - navigationEntry.responseStart
      },
      
      // Paint Timing API metrics
      paintTiming: {
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime
      },
      
      // Resource Timing
      resources: {
        count: performance.getEntriesByType('resource').length,
        totalSize: performance.getEntriesByType('resource').reduce((total, resource) => total + (resource.transferSize || 0), 0),
        totalDuration: performance.getEntriesByType('resource').reduce((total, resource) => total + (resource.duration || 0), 0)
      }
    };
  });
}

/**
 * Checks for basic accessibility issues
 * @param {Object} page - The Playwright page object
 * @returns {Promise<Object>} - A promise that resolves to an object with accessibility issues
 */
async function checkBasicAccessibility(page) {
  return page.evaluate(() => {
    const issues = [];
    
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    for (const img of images) {
      if (!img.hasAttribute('alt')) {
        issues.push({
          type: 'missing-alt',
          element: img.outerHTML.substring(0, 100),
          impact: 'serious'
        });
      }
    }
    
    // Check for form labels
    const formControls = document.querySelectorAll('input, select, textarea');
    for (const control of formControls) {
      const id = control.getAttribute('id');
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (!label) {
          issues.push({
            type: 'missing-label',
            element: control.outerHTML.substring(0, 100),
            impact: 'serious'
          });
        }
      } else if (!control.hasAttribute('aria-label') && !control.hasAttribute('aria-labelledby')) {
        issues.push({
          type: 'missing-label',
          element: control.outerHTML.substring(0, 100),
          impact: 'serious'
        });
      }
    }
    
    // Check for heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    for (const heading of headings) {
      const level = parseInt(heading.tagName.substring(1));
      if (previousLevel > 0 && level > previousLevel + 1) {
        issues.push({
          type: 'heading-skip',
          element: heading.outerHTML.substring(0, 100),
          impact: 'moderate'
        });
      }
      previousLevel = level;
    }
    
    return {
      issues,
      summary: {
        total: issues.length,
        byType: issues.reduce((acc, issue) => {
          acc[issue.type] = (acc[issue.type] || 0) + 1;
          return acc;
        }, {}),
        byImpact: issues.reduce((acc, issue) => {
          acc[issue.impact] = (acc[issue.impact] || 0) + 1;
          return acc;
        }, {})
      }
    };
  });
}

module.exports = {
  calculateContrastRatio,
  calculateRelativeLuminance,
  simulateNetworkCondition,
  collectPerformanceMetrics,
  checkBasicAccessibility
};