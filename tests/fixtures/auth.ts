import { test as base, expect } from '@playwright/test';

export type AuthFixtures = {
  registeredUser: { email: string; password: string; firstName?: string };
};

export const test = base.extend<AuthFixtures>({
  registeredUser: async ({}, use) => {
    // Known demo account on automationexercise.com doesn't exist; we'll create a throwaway if needed.
    // For acceptance criteria, we use provided credentials and adapt flow to site (Account creation + login)
    await use({ email: 'jane@example.com', password: 'CorrectPass123!', firstName: 'Jane' });
  },
});
export { expect };
