import process from 'node:process';
import { describe, expect, it } from 'vitest';

try {
  process.loadEnvFile();
} catch {
  // Ignore errors when loading the environment file
}

const apiBaseUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

describe('GET /api/v2/invoices', () => {
  it('should return 401 when the request has no Authorization header', async () => {
    if (!apiBaseUrl) {
      throw new Error('API_URL is required; set it in .env or the test environment');
    }

    const response = await fetch(`${apiBaseUrl}/api/v2/invoices`, {
      headers: apiKey ? { 'X-Api-Key': apiKey } : {},
    });

    expect(response.status).toBe(401);
  });
});
