/**
 * Generates a random email address for testing
 * @returns {string} Random email address
 */
function generateRandomEmail() {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `test_${randomString}_${timestamp}@example.com`;
}

/**
 * Generates random user data for registration
 * @returns {Object} User data object
 */
function generateRandomUserData() {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  
  return {
    name: `Test User ${randomString}`,
    email: `test_${randomString}_${timestamp}@example.com`,
    password: `password${randomString}`,
    title: Math.random() > 0.5 ? 'Mr' : 'Mrs',
    birthDay: Math.floor(Math.random() * 28) + 1,
    birthMonth: Math.floor(Math.random() * 12) + 1,
    birthYear: Math.floor(Math.random() * 30) + 1970,
    firstName: `First${randomString}`,
    lastName: `Last${randomString}`,
    company: `Company ${randomString}`,
    address1: `${Math.floor(Math.random() * 9999) + 1} Main St`,
    address2: `Apt ${Math.floor(Math.random() * 999) + 1}`,
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: `${Math.floor(Math.random() * 89999) + 10000}`,
    mobileNumber: `${Math.floor(Math.random() * 8999999999) + 1000000000}`
  };
}

module.exports = {
  generateRandomEmail,
  generateRandomUserData
};