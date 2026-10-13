import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/vue';
import ConsumptionChart from '@components/ConsumptionChart.vue';

const { destroyMock } = vi.hoisted(() => {
  const destroyMock = vi.fn();
  return { destroyMock };
});

vi.mock('chart.js', () => ({
  Chart: class ChartMock {
    static register() {}
    constructor() {
      this.destroy = destroyMock;
    }
    destroy() {
      destroyMock();
    }
  },
  BarController: {},
  BarElement: {},
  CategoryScale: {},
  LinearScale: {},
  Tooltip: {},
}));

describe('ConsumptionChart', () => {
  it('renders the chart with the correct data', () => {
    render(ConsumptionChart, {
      props: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        values: [10, 20, 30, 40, 50],
      },
    });

    expect(document.querySelector('canvas')).toBeTruthy();
  });
  it('destroys the chart when unmounted', () => {
    const { unmount } = render(ConsumptionChart, {
      props: {
        months: ['Jan', 'Feb'],
        values: [10, 20],
      },
    });

    unmount();

    expect(destroyMock).toHaveBeenCalled();
  });
});
