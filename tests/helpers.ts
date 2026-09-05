import type { APIRequestContext, Page } from '@playwright/test';

export type UserAccount = {
  name: string;
  email: string;
  password: string;
  title: string;
  firstName: string;
  lastName: string;
};

export function buildUserAccount(prefix = 'autotest'): UserAccount {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    name: `Automation User ${suffix}`,
    email: `${prefix}${suffix}@example.com`,
    password: `Pass${suffix}!`,
    title: 'Mr',
    firstName: 'Automation',
    lastName: `User${suffix}`,
  };
}

export function buildCreateAccountForm(user: UserAccount) {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    title: user.title,
    birth_date: '10',
    birth_month: '2',
    birth_year: '1995',
    firstname: user.firstName,
    lastname: user.lastName,
    company: 'Automation Exercise',
    address1: '123 Test Street',
    address2: 'Suite 456',
    country: 'United States',
    zipcode: '12345',
    state: 'California',
    city: 'Los Angeles',
    mobile_number: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
  };
}

export async function dismissCookieConsent(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll('.fc-consent-root, .fc-dialog-overlay').forEach((element) => element.remove());
  });
}

export async function createUserApi(request: APIRequestContext, user: UserAccount) {
  const response = await request.post('/api/createAccount', {
    form: buildCreateAccountForm(user),
  });

  const body = await response.json();

  if (response.status() !== 200 && response.status() !== 201) {
    throw new Error(`Failed to create user: ${response.status()} ${JSON.stringify(body)}`);
  }

  return body;
}

export async function deleteUserApi(request: APIRequestContext, email: string, password: string) {
  const response = await request.delete('/api/deleteAccount', {
    form: { email, password },
  });

  const body = await response.text();

  if (response.status() !== 200) {
    throw new Error(`Failed to delete user: ${response.status()} ${body}`);
  }

  return body;
}
