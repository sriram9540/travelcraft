import { Duffel } from '@duffel/api';

const token = process.env.DUFFEL_ACCESS_TOKEN?.replace(/^Bearer\s+/i, '').trim() || '';
console.log('Duffel API Client Initialization - Token present:', !!token);

export const duffel = new Duffel({
  token: token || 'dummy_token'
});

export function getDuffelClient() {
  const currentToken = process.env.DUFFEL_ACCESS_TOKEN?.replace(/^Bearer\s+/i, '').trim();
  if (!currentToken) {
    throw new Error('DUFFEL_ACCESS_TOKEN environment variable is missing.');
  }
  return new Duffel({ token: currentToken });
}
