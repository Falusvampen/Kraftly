import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom/vitest';
import StatusChip from '@components/StatusChip.vue';

describe('StatusChip.vue', () => {
  it('renders the paid status with the paid styling', () => {
    render(StatusChip, {
      props: { status: 'Betald' },
    });

    const status = screen.getByText('Betald');

    expect(status).toBeInTheDocument();
    expect(status).toHaveClass('status-chip', 'status-betald');
    expect(status).not.toHaveClass('status-obetald');
  });

  it('renders the unpaid status with the unpaid styling', () => {
    render(StatusChip, {
      props: { status: 'Obetald' },
    });

    const status = screen.getByText('Obetald');

    expect(status).toBeInTheDocument();
    expect(status).toHaveClass('status-chip', 'status-obetald');
    expect(status).not.toHaveClass('status-betald');
  });
});
