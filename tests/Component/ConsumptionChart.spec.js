import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/vue';
import ConsumptionChart from '../../src/components/ConsumptionChart.vue';

const { chartMock, destroyMock } = vi.hoisted(() => {
  const destroyMock = vi.fn();

  const chartMock = vi.fn(function () {
    this.destroy = destroyMock;
  });

  return { chartMock, destroyMock };
});

vi.mock('chart.js/auto', () => ({
  default: chartMock,
}));

describe('ConsumptionChart', () => {
  it('renders the chart with the correct data', () => {
    render(ConsumptionChart, {
      props: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        values: [10, 20, 30, 40, 50],
      },
    });

    expect(chartMock).toHaveBeenCalledWith(
      expect.any(HTMLCanvasElement),
      expect.objectContaining({
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            expect.objectContaining({
              data: [10, 20, 30, 40, 50],
            }),
          ],
        },
      }),
    );
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
