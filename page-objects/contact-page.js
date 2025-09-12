class ContactPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageTextarea = page.locator('textarea[data-qa="message"]');
    this.fileUploadInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert.alert-success');
    this.homeButton = page.locator('#form-section a.btn.btn-success');
  }

  async fillContactForm(contactData) {
    await this.nameInput.fill(contactData.name);
    await this.emailInput.fill(contactData.email);
    await this.subjectInput.fill(contactData.subject);
    await this.messageTextarea.fill(contactData.message);
  }

  async uploadFile(filePath) {
    // Note: In a real implementation, you would need to have the file available
    // This is a placeholder for the file upload functionality
    await this.fileUploadInput.setInputFiles(filePath);
  }

  async clickButton(buttonText) {
    if (buttonText === 'Submit') {
      await this.submitButton.click();
    } else if (buttonText === 'Home') {
      await this.homeButton.click();
    }
  }
}

module.exports = ContactPage;