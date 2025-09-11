const BasePage = require('./BasePage');

/**
 * Contact Page Object containing selectors and methods for the contact page
 */
class ContactPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.contactFormSection = '.contact-form';
    this.getInTouchHeading = '.contact-form h2.title';
    this.nameInput = 'input[data-qa="name"]';
    this.emailInput = 'input[data-qa="email"]';
    this.subjectInput = 'input[data-qa="subject"]';
    this.messageTextarea = 'textarea[data-qa="message"]';
    this.uploadFileInput = 'input[name="upload_file"]';
    this.submitButton = 'input[data-qa="submit-button"]';
    this.successMessage = '.status.alert.alert-success';
    this.homeButton = '#form-section a';
  }

  /**
   * Navigate to contact page
   */
  async navigateToContactPage() {
    await this.navigate('/contact_us');
    await this.waitForPageLoad();
  }

  /**
   * Fill contact form
   * @param {Object} contactDetails - Contact form details
   */
  async fillContactForm(contactDetails) {
    await this.fillInput(this.nameInput, contactDetails.name);
    await this.fillInput(this.emailInput, contactDetails.email);
    await this.fillInput(this.subjectInput, contactDetails.subject);
    await this.fillInput(this.messageTextarea, contactDetails.message);
  }

  /**
   * Upload file
   * @param {string} filePath - Path to file to upload
   */
  async uploadFile(filePath) {
    await this.page.setInputFiles(this.uploadFileInput, filePath);
  }

  /**
   * Submit contact form
   */
  async submitContactForm() {
    await this.clickElement(this.submitButton);
    
    // Handle alert if it appears
    try {
      await this.page.on('dialog', async dialog => {
        await dialog.accept();
      });
    } catch (error) {
      console.log('No dialog appeared or it was already handled');
    }
    
    await this.waitForPageLoad();
  }

  /**
   * Check if success message is displayed
   * @returns {Promise<boolean>} - True if success message is displayed
   */
  async isSuccessMessageDisplayed() {
    return await this.isElementVisible(this.successMessage);
  }

  /**
   * Get success message text
   * @returns {Promise<string>} - Success message text
   */
  async getSuccessMessageText() {
    return await this.getElementText(this.successMessage);
  }

  /**
   * Click home button to return to home page
   */
  async clickHomeButton() {
    await this.clickElement(this.homeButton);
    await this.waitForPageLoad();
  }

  /**
   * Check if contact form is displayed
   * @returns {Promise<boolean>} - True if contact form is displayed
   */
  async isContactFormDisplayed() {
    return await this.isElementVisible(this.contactFormSection);
  }

  /**
   * Get "Get In Touch" heading text
   * @returns {Promise<string>} - Heading text
   */
  async getInTouchHeadingText() {
    return await this.getElementText(this.getInTouchHeading);
  }
}

module.exports = ContactPage;