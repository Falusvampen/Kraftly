import process from 'node:process';
import { describe, expect, it } from 'vitest';

const apiBaseUrl = process.env.API_URL || 'https://kraftly-api.sprinto.cloud'; //<---eventuellt säkerhetsrisk? hardcodat?

describe('GET /api/v2/invoices', () => {
  it('should return 401 when the request has no Authorization header', async () => {
    const response = await fetch(`${apiBaseUrl}/api/v2/invoices`);

    expect(response.status).toBe(401);
  });
});
