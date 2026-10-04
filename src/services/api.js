// API client for Kraftly "Mina sidor"
import { setAccessToken } from './token';
import { getAccessToken } from './token';

const request = async (path, options = {}) => {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
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

export const fetchUser = () => request('/api/v2/user');

export const fetchConsumption = () => request('/api/v2/consumption');

export const fetchInvoices = () => request('/api/v2/invoices');

export const submitMove = (data) =>
  request('/api/v2/move', { method: 'POST', body: JSON.stringify(data) });

export const saveUser = (data) =>
  request('/api/v2/user', { method: 'PUT', body: JSON.stringify(data) });

const refreshAccessToken = async () => {
  try {
    const res = await fetch('/api/v2/auth/refresh', {
      method: 'POST',
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
