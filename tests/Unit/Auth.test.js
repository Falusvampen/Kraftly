import process from 'node:process';
import { describe, expect, it } from 'vitest';

if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile();
}

const apiBaseUrl = process.env.API_URL;
const protectedInvoicesUrl = `${apiBaseUrl}/api/v2/invoices`;

describe('GET /api/v2/invoices', () => {
  it('should return 401 when the request has no Authorization header', async () => {
    expect(apiBaseUrl).toBeTruthy();

    const response = await fetch(protectedInvoicesUrl);
    const body = await response.text();

    expect(response.status).toBe(401);
    expect(body).toBeTruthy();
  });
});
