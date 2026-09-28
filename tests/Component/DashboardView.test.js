import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom/vitest';
import DashboardView from '@/views/DashboardView.vue';
import { isEnabled } from '@/utils/features';

vi.mock('@components/ConsumptionChart.vue', () => ({
  default: {
    name: 'ConsumptionChart',
    template: '<div data-testid="consumption-chart-mock"></div>',
  },
}));

vi.mock('@/stores/user', () => ({
  useUserStore: () => ({
    load: vi.fn(),
    user: { name: 'Test Testsson', contract: 'Rörligt' },
  }),
}));

vi.mock('@/stores/consumption', () => ({
  useConsumptionStore: () => ({
    load: vi.fn(),
    loading: false,
    data: { months: [], values: [100], pricePerKwh: 1.2 },
  }),
}));

vi.mock('@/utils/features', () => ({
  isEnabled: vi.fn(),
}));

describe('Dashboard integrerat med NorwayNotice', () => {
  it('renderar NorwayNotice inuti Dashboard när flaggan är true', () => {
    vi.mocked(isEnabled).mockReturnValue(true);

    render(DashboardView);

    expect(screen.getByRole('heading', { name: /Kraftly kommer till Norge/i })).toBeInTheDocument();
  });
});
