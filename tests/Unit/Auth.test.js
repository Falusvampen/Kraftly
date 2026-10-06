import { existsSync } from 'node:fs';
import process from 'node:process';
import { describe, expect, it } from 'vitest';

if (!process.env.API_URL && typeof process.loadEnvFile === 'function' && existsSync('.env')) {
  process.loadEnvFile();
}

const apiBaseUrl = process.env.API_URL;

describe('GET /api/v2/invoices', () => {
  it('should return 401 when the request has no Authorization header', async () => {
    expect(apiBaseUrl, 'API_URL must be set for this test').toBeTruthy();

    const response = await fetch(`${apiBaseUrl}/api/v2/invoices`);

    expect(response.status).toBe(401);
  });
});
