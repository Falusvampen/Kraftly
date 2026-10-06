import { afterEach, describe, expect, it, vi } from 'vitest';
import { initAuth, fetchUser, login } from '../../src/services/api.js';
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
  it('does not store the token in localStorage or sessionStorage', async () => {
    localStorage.clear();
    sessionStorage.clear();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ accessToken: 'secret-token-123' }),
      }),
    );

    await initAuth();

    expect(getAccessToken()).toBe('secret-token-123');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('kraftly_logged_in')).toBeNull();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it('does not retry a request after refresh when it still returns 401', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ status: 401, ok: false })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'new-token' }) })
      .mockResolvedValueOnce({ status: 401, ok: false });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchUser()).rejects.toThrow('API error 401');
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('does not refresh after a failed login', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ status: 401, ok: false });
    vi.stubGlobal('fetch', fetchMock);

    await expect(login('bad@example.com', 'wrong-password')).rejects.toThrow('API error 401');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
