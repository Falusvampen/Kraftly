// src/components/NorwayNotice.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom/vitest';
import NorwayNotice from '@components/NorwayNotice.vue';
import { isEnabled } from '@/utils/features';

vi.mock('@utils/features', () => ({
  isEnabled: vi.fn(),
}));

describe('NorwayNotice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('visas inte när feature-flaggan är inaktiv', () => {
    vi.mocked(isEnabled).mockReturnValue(false);

    render(NorwayNotice);

    expect(screen.queryByRole('heading', { name: /Norge/i })).not.toBeInTheDocument();
  });

  it('visas när feature-flaggan är aktiv', () => {
    vi.mocked(isEnabled).mockReturnValue(true);

    render(NorwayNotice);

    expect(screen.getByRole('heading', { name: /Norge/i })).toBeInTheDocument();
  });
});
