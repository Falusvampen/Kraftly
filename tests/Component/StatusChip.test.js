import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import StatusChip from '../../src/components/StatusChip.vue'


describe('StatusChip.vue', () => {
  it('shows text paid', () => {
    const { container } = render(StatusChip, {
      props: { status: 'Betald' }
    });

    expect(screen.getByText('Betald')).toBeDefined();

    const spanElement = container.firstChild;
    expect(spanElement.className).toContain('status-betald');
    expect(spanElement.className).not.toContain('status-obetald');
  });

  it('shows text unpaid', () => {
    const { container } = render(StatusChip, {
      props: { status: 'Obetald' }
    });

    expect(screen.getByText('Obetald')).toBeDefined();

    const spanElement = container.firstChild;
    expect(spanElement.className).toContain('status-obetald');
    expect(spanElement.className).not.toContain('status-betald');
  });
});