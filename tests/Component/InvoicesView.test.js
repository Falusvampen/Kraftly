import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/vue';
import '@testing-library/jest-dom/vitest';
import InvoicesView from '@/views/InvoicesView.vue';

vi.mock('@/services/api', () => ({
  fetchInvoices: vi
    .fn()
    .mockResolvedValue([
      { id: 'F-1001', period: 'Jan', amount: 500, due: '2026-02-01', status: 'betald' },
    ]),
}));

describe('InvoicesView', () => {
  afterEach(cleanup);

  it('sätter scope="col" på kolumnrubrikerna', async () => {
    render(InvoicesView);
    expect(await screen.findByRole('columnheader', { name: 'Belopp' })).toHaveAttribute(
      'scope',
      'col',
    );
  });

  it('ger den tomma rubriken och nedladdningen tillgängliga namn', async () => {
    render(InvoicesView);
    expect(await screen.findByRole('columnheader', { name: 'Åtgärd' })).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Ladda ner faktura F-1001' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'F-1001', exact: true })).toBeInTheDocument();
  });
});
