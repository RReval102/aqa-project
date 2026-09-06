import { test as base, expect } from '@playwright/test';
import { buildUserAccount, createUserApi, deleteUserApi, type UserAccount } from '../../tests/helpers';

type CustomFixtures = {
  testUser: UserAccount;
};

export const test = base.extend<CustomFixtures>({
  testUser: async ({ request }, use) => {
    const user = buildUserAccount();
    await createUserApi(request, user);

    await use(user);

    try {
      const response = await deleteUserApi(request, user.email, user.password);
      if (!response) {
        throw new Error('Account cleanup response was empty.');
      }
    } catch (error) {
      console.warn(`Cleanup failed for ${user.email}:`, error);
    }
  },
});

export { expect };
