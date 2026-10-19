import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import StatusChip from '@components/StatusChip.vue';

describe('StatusChip – tillgänglighet', () => {
  it('har inga axe-överträdelser', async () => {
    const { container } = render(StatusChip, {
      props: {
        invoice: {
          id: 'F-2026-06',
          status: 'Betald',
          due: '2026-06-30',
        },
      },
    });

    // Kontrollerar den renderade HTML-strukturen mot axe-core reglerna
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
