import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import validateMove from '../../src/utils/validateMove.js';

describe('validateMove', () => {
  const validForm = {
    address: 'Solvägen 12',
    zip: '80267',
    city: 'Gävle',
    date: '2026-09-20',
    contract: 'Rörligt pris',
  };
  // Före varje test så sätter vi systemtiden till 2026-09-01 för att kunna testa datumvalidering på ett konsekvent sätt.
  beforeEach(() => {
    // ´vi.useFakeTimers() används för att kunna manipulera systemtiden i testerna :)
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-01'));
  });

  afterEach(() => {
    // vi.useRealTimers() återställer systemtiden till den verkliga tiden efter varje test!
    vi.useRealTimers();
  });

  it('should validate a completely valid form', () => {
    const errors = validateMove(validForm);

    expect(errors).toEqual({
      address: null,
      zip: null,
      city: null,
      date: null,
      contract: null,
    });
  });

  it('should return an error when address is missing or empty', () => {
    const form = { ...validForm, address: '' };
    const errors = validateMove(form);

    expect(errors.address).toBe('Adress är obligatoriskt');
  });

  it('should return an error when address contains only whitespace', () => {
    const form = { ...validForm, address: '   ' };
    const errors = validateMove(form);

    expect(errors.address).toBe('Adress är obligatoriskt');
  });

  it('should return an error when postal code is missing', () => {
    const form = { ...validForm, zip: '' };
    const errors = validateMove(form);

    expect(errors.zip).toBe('Postnummer är obligatoriskt');
  });

  it('should return an error when postal code is not exactly five digits', () => {
    const form = { ...validForm, zip: '1234' };
    const errors = validateMove(form);

    expect(errors.zip).toBe('Postnummer måste vara exakt fem siffror');
  });

  it('should allow postal code formatted with spaces', () => {
    const form = { ...validForm, zip: '802 67' };
    const errors = validateMove(form);

    expect(errors.zip).toBeNull();
  });

  it('should return an error when city is missing or empty', () => {
    const form = { ...validForm, city: '' };
    const errors = validateMove(form);

    expect(errors.city).toBe('Stad är obligatoriskt');
  });

  it('should return an error when contract type is missing', () => {
    const form = { ...validForm, contract: '' };
    const errors = validateMove(form);

    expect(errors.contract).toBe('Avtalstyp är obligatoriskt');
  });

  it('should return an error for invalid date format', () => {
    const form = { ...validForm, date: '2026/09/20' };
    const errors = validateMove(form);

    expect(errors.date).toBe('Datum måste vara i formatet ÅÅÅÅ-MM-DD');
  });

  it('should return an error for a non-existent calendar date', () => {
    const form = { ...validForm, date: '2026-02-31' };
    const errors = validateMove(form);

    expect(errors.date).toBe('Ogiltigt datum');
  });

  it('should return an error when move date is less than 14 days ahead', () => {
    const form = { ...validForm, date: '2026-09-14' };
    const errors = validateMove(form);

    expect(errors.date).toBe('Flyttdatum måste vara minst 14 dagar framåt i tiden');
  });

  it('should allow move date that is exactly 14 days ahead', () => {
    const form = { ...validForm, date: '2026-09-15' };
    const errors = validateMove(form);

    expect(errors.date).toBeNull();
  });
});
