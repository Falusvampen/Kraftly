import { afterEach, describe, expect, it, vi } from 'vitest';
import { initAuth } from '../../src/services/api.js';
import { getAccessToken, setAccessToken } from '../../src/services/token.js';

describe('initAuth', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    setAccessToken(null);
  });

  it.each([
    [{ access: { Token: 'nested-token' } }, 'nested-token'],
    [{ accessToken: 'camel-token' }, 'camel-token'],
    [{ token: 'token' }, 'token'],
  ])('restores an access token from the API response', async (response, token) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => response }));

    await expect(initAuth()).resolves.toBe(true);
    expect(getAccessToken()).toBe(token);
  });

  it('fails when the refresh response has no token', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));

    await expect(initAuth()).resolves.toBe(false);
    expect(getAccessToken()).toBeNull();
  });
});
