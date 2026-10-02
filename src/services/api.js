// API client for Kraftly "Mina sidor"
import { setAccessToken } from './token';

const request = async (path, options = {}) => {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error('API error ' + res.status);
  }
  return res.json();
};

export const login = (email, password) =>
  request('/api/v2/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const fetchUser = () => request('/api/user');

export const fetchConsumption = () => request('/api/consumption');

export const fetchInvoices = () => request('/api/invoices');

export const submitMove = (data) =>
  request('/api/move', { method: 'POST', body: JSON.stringify(data) });

export const saveUser = (data) =>
  request('/api/user', { method: 'PUT', body: JSON.stringify(data) });

const refreshAccessToken = async () => {
  try {
    const res = await fetch('/api/v2/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      setAccessToken(null);
      return false;
    }

    const data = await res.json();
    setAccessToken(data.token);
    return true;
  } catch {
    setAccessToken(null);
    return false;
  }
};

export const initAuth = () => refreshAccessToken();
