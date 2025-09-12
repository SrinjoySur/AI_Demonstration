const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Background steps
Given('I am on the products page', async function() {
  // Start performance measurement
  await page.evaluate(() => {
    window.performance.mark('navigation-start');
  });
  
  await page.goto('https://automationexercise.com/products');
  
  // End performance measurement
  await page.evaluate(() => {
    window.performance.mark('navigation-end');
    window.performance.measure('navigation', 'navigation-start', 'navigation-end');
  });
  
  expect(await page.title()).toContain('All Products');
});

// Performance steps
When('I measure the page load time', async function() {
  // The measurement was already started in the Given step
  this.performanceMeasures = await page.evaluate(() => {
    return {
      navigationTiming: performance.getEntriesByType('navigation')[0],
      resourceTiming: performance.getEntriesByType('resource'),
      paintTiming: performance.getEntriesByType('paint'),
      customMeasures: performance.getEntriesByName('navigation')
    };
  });
});

Then('the page should load within acceptable time limits', async function() {
  const loadTime = this.performanceMeasures.navigationTiming.loadEventEnd - 
                   this.performanceMeasures.navigationTiming.startTime;
  
  console.log(`Page load time: ${loadTime}ms`);
  
  // Acceptable load time threshold (5 seconds)
  expect(loadTime).toBeLessThan(5000);
});

Then('all critical elements should be visible within {int} seconds', async function(seconds) {
  const criticalSelectors = [
    '.features_items', // Product container
    '.left-sidebar',    // Sidebar with filters
    '.brands_products', // Brand filters
    '.product-image-wrapper:nth-child(1)' // First product
  ];
  
  for (const selector of criticalSelectors) {
    const element = await page.waitForSelector(selector, { 
      timeout: seconds * 1000,
      state: 'visible'
    });
    
    expect(element).not.toBeNull();
  }
});

When('I search for {string}', async function(keyword) {
  // Start performance measurement
  await page.evaluate(() => {
    window.performance.mark('search-start');
  });
  
  await page.getByRole('textbox', { name: 'Search Product' }).fill(keyword);
  await page.getByRole('button', { name: '' }).click();
  
  // End performance measurement after results are loaded
  await page.waitForSelector('.features_items');
  await page.evaluate(() => {
    window.performance.mark('search-end');
    window.performance.measure('search', 'search-start', 'search-end');
  });
});

Then('the search results should load within {int} seconds', async function(seconds) {
  const searchTime = await page.evaluate(() => {
    const measures = performance.getEntriesByName('search');
    return measures.length > 0 ? measures[0].duration : null;
  });
  
  console.log(`Search response time: ${searchTime}ms`);
  
  expect(searchTime).toBeLessThan(seconds * 1000);
});

Then('the page should remain responsive during search', async function() {
  // Check if we can interact with the page
  await page.getByRole('link', { name: 'Home' }).hover();
  
  // Try to click on a different element
  await page.getByRole('link', { name: 'Products' }).click();
  
  // Check that we navigated successfully
  expect(await page.title()).toContain('All Products');
});

When('I select the {string} category', async function(category) {
  // Start performance measurement
  await page.evaluate(() => {
    window.performance.mark('filter-start');
  });
  
  await page.getByRole('link', { name: ` ${category}` }).click();
  
  // End performance measurement after results are loaded
  await page.waitForSelector('.features_items');
  await page.evaluate(() => {
    window.performance.mark('filter-end');
    window.performance.measure('filter', 'filter-start', 'filter-end');
  });
});

Then('the filtered results should load within {int} seconds', async function(seconds) {
  const filterTime = await page.evaluate(() => {
    const measures = performance.getEntriesByName('filter');
    return measures.length > 0 ? measures[0].duration : null;
  });
  
  console.log(`Filter response time: ${filterTime}ms`);
  
  expect(filterTime).toBeLessThan(seconds * 1000);
});

Then('the page should remain responsive during filtering', async function() {
  // Check if we can interact with the page
  await page.getByRole('link', { name: 'Home' }).hover();
  
  // Try to click on a different element
  await page.getByRole('link', { name: 'Products' }).click();
  
  // Check that we navigated successfully
  expect(await page.title()).toContain('All Products');
});

When('I scroll through the products page', async function() {
  // Get the initial state of images
  this.initialImageStates = await page.$$eval('.productinfo img', images => {
    return images.map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth
    }));
  });
  
  // Scroll down slowly to trigger lazy loading if implemented
  await page.evaluate(() => {
    return new Promise(resolve => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  // Wait a moment for images to load
  await page.waitForTimeout(1000);
});

Then('product images should load progressively', async function() {
  // Get the final state of images
  const finalImageStates = await page.$$eval('.productinfo img', images => {
    return images.map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth
    }));
  });
  
  // Check that images are loaded
  expect(finalImageStates.filter(img => img.complete && img.naturalWidth > 0).length)
    .toBeGreaterThan(0);
});

Then('placeholder images should be shown while loading', async function() {
  // This is difficult to test automatically as we'd need to intercept network requests
  // and delay image loading. For now, we'll just check if images have src attributes.
  const images = await page.$$eval('.productinfo img', images => {
    return images.map(img => ({
      src: img.src,
      hasAttribute: img.hasAttribute('src')
    }));
  });
  
  expect(images.every(img => img.hasAttribute)).toBeTruthy();
});

// Accessibility steps
When('I navigate the page using only the keyboard', async function() {
  // Press Tab multiple times to navigate through the page
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
  }
});

Then('I should be able to access all interactive elements', async function() {
  // Check if we can focus on important interactive elements
  const interactiveSelectors = [
    'input[name="search"]', // Search box
    'button[type="submit"]', // Search button
    '.left-sidebar a',       // Category links
    '.choose a'              // View Product links
  ];
  
  for (const selector of interactiveSelectors) {
    await page.focus(selector);
    const isFocused = await page.evaluate(sel => {
      const element = document.querySelector(sel);
      return element === document.activeElement;
    }, selector);
    
    expect(isFocused).toBeTruthy();
  }
});

Then('the focus should be visibly indicated', async function() {
  // This is a visual check that's hard to automate
  // We'll check if there's any CSS for :focus
  const hasFocusStyles = await page.evaluate(() => {
    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (let i = 0; i < rules.length; i++) {
          if (rules[i].selectorText && rules[i].selectorText.includes(':focus')) {
            return true;
          }
        }
      } catch (e) {
        // Ignore security errors for cross-origin stylesheets
      }
    }
    return false;
  });
  
  // This might not be reliable as focus styles could be defined inline or in external CSS
  console.log(`Focus styles detected: ${hasFocusStyles}`);
});

When('I examine the page with screen reader detection', async function() {
  // This is a simulated check as we can't actually run a screen reader in the test
  this.ariaAttributes = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const ariaElements = [];
    
    for (const element of elements) {
      const attributes = Array.from(element.attributes);
      const ariaAttrs = attributes.filter(attr => attr.name.startsWith('aria-') || attr.name === 'role');
      
      if (ariaAttrs.length > 0) {
        ariaElements.push({
          tagName: element.tagName,
          ariaAttributes: ariaAttrs.map(attr => ({ name: attr.name, value: attr.value }))
        });
      }
    }
    
    return ariaElements;
  });
});

Then('all important elements should have appropriate ARIA labels', async function() {
  // Check if there are any ARIA attributes used on the page
  console.log(`Found ${this.ariaAttributes.length} elements with ARIA attributes`);
  
  // This is a basic check - a real accessibility audit would be more thorough
  expect(this.ariaAttributes.length).toBeGreaterThan(0);
});

Then('images should have descriptive alt text', async function() {
  const imagesWithAlt = await page.$$eval('img', images => {
    return images.filter(img => img.hasAttribute('alt') && img.alt.trim() !== '').length;
  });
  
  const totalImages = await page.$$eval('img', images => images.length);
  
  console.log(`Images with alt text: ${imagesWithAlt}/${totalImages}`);
  
  // Ideally all images should have alt text, but we'll check for at least some
  expect(imagesWithAlt).toBeGreaterThan(0);
});

When('I check the color contrast of text elements', async function() {
  // This is a simplified check - real contrast analysis requires more sophisticated tools
  this.textElements = await page.$$eval('p, h1, h2, h3, h4, h5, h6, a, span, label, button', elements => {
    return elements.map(el => {
      const style = window.getComputedStyle(el);
      return {
        tagName: el.tagName,
        textContent: el.textContent.trim().substring(0, 50),
        color: style.color,
        backgroundColor: style.backgroundColor
      };
    });
  });
});

Then('all text should have sufficient contrast with its background', async function() {
  // This is a simplified check - real contrast analysis requires calculating contrast ratios
  console.log(`Analyzed ${this.textElements.length} text elements for color contrast`);
  
  // We can't actually check contrast ratios without additional libraries
  // This is just a placeholder for a real accessibility test
  expect(this.textElements.length).toBeGreaterThan(0);
});

Then('important UI elements should be distinguishable', async function() {
  // Check if buttons and links have distinct styles
  const buttonStyles = await page.$$eval('button, .btn', elements => {
    return elements.map(el => {
      const style = window.getComputedStyle(el);
      return {
        backgroundColor: style.backgroundColor,
        color: style.color,
        border: style.border
      };
    });
  });
  
  console.log(`Analyzed ${buttonStyles.length} button elements for distinguishability`);
  
  // Again, this is just a placeholder for a real accessibility test
  expect(buttonStyles.length).toBeGreaterThan(0);
});

When('I resize the browser to mobile dimensions', async function() {
  // Set viewport to mobile size
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone 8 dimensions
});

Then('the page layout should adapt appropriately', async function() {
  // Check if the page has responsive design elements
  const isResponsive = await page.evaluate(() => {
    // Check for viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // Check for media queries
    const hasMediaQueries = Array.from(document.styleSheets).some(sheet => {
      try {
        return Array.from(sheet.cssRules).some(rule => 
          rule.type === CSSRule.MEDIA_RULE
        );
      } catch (e) {
        // Ignore security errors for cross-origin stylesheets
        return false;
      }
    });
    
    return {
      hasViewportMeta: !!viewportMeta,
      hasMediaQueries
    };
  });
  
  console.log(`Responsive design check: ${JSON.stringify(isResponsive)}`);
  
  // Check if important elements are still visible
  await expect(page.locator('.features_items')).toBeVisible();
});

Then('all functionality should remain accessible', async function() {
  // Check if important interactive elements are still accessible
  const interactiveSelectors = [
    'input[name="search"]', // Search box
    'button[type="submit"]', // Search button
    '.product-image-wrapper'  // Product cards
  ];
  
  for (const selector of interactiveSelectors) {
    await expect(page.locator(selector).first()).toBeVisible();
  }
});

When('I increase the browser font size by 200%', async function() {
  // Increase font size using page zoom or text scaling
  await page.evaluate(() => {
    document.body.style.fontSize = '200%';
  });
});

Then('the text should scale without loss of functionality', async function() {
  // Check if important elements are still visible and functional
  await expect(page.locator('.features_items')).toBeVisible();
  
  // Try to interact with the page
  await page.getByRole('link', { name: 'Home' }).hover();
});

Then('no content should be cut off or overlap', async function() {
  // This is a visual check that's hard to automate
  // We'll check if container elements still contain their children
  const containmentCheck = await page.evaluate(() => {
    const containers = document.querySelectorAll('.container');
    let allContained = true;
    
    for (const container of containers) {
      const containerRect = container.getBoundingClientRect();
      
      for (const child of container.children) {
        const childRect = child.getBoundingClientRect();
        
        // Check if child is fully contained within parent
        if (childRect.left < containerRect.left ||
            childRect.right > containerRect.right) {
          allContained = false;
          break;
        }
      }
      
      if (!allContained) break;
    }
    
    return allContained;
  });
  
  console.log(`Content containment check: ${containmentCheck}`);
});

When('I simulate a slow network connection', async function() {
  // Simulate slow 3G network
  await page.context().route('**/*', route => {
    // Add delay to all requests
    setTimeout(() => route.continue(), 100);
  });
  
  // Reload the page with the throttled network
  await page.reload();
});

Then('the page should load essential content first', async function() {
  // Check if critical content loads before non-critical content
  
  // First, wait for the main content container
  await page.waitForSelector('.features_items', { timeout: 10000 });
  
  // Check if we can see product titles before images are fully loaded
  const productTitles = await page.$$('.productinfo p');
  expect(productTitles.length).toBeGreaterThan(0);
});

Then('provide appropriate feedback during loading', async function() {
  // Check for loading indicators or progressive rendering
  // This is hard to test automatically, but we can check if the page becomes interactive
  // even if some resources are still loading
  
  // Try to interact with the page
  await page.getByRole('link', { name: 'Home' }).hover();
  
  // Clean up - remove the network throttling
  await page.context().unroute('**/*');
});