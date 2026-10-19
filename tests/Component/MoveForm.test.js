import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import MoveForm from '@components/MoveForm.vue';

describe('MoveForm.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-01'));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('renders all form controls and submit button', () => {
    render(MoveForm);

    expect(screen.getByLabelText('Ny adress')).toBeInTheDocument();
    expect(screen.getByLabelText('Postnummer')).toBeInTheDocument();
    expect(screen.getByLabelText('Ort')).toBeInTheDocument();
    expect(screen.getByLabelText('Inflyttningsdatum')).toBeInTheDocument();
    expect(screen.getByLabelText('Avtal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skicka flyttanmälan/i })).toBeInTheDocument();
  });

  it('displays validation errors and does not submit when fields are empty', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { emitted } = render(MoveForm);

    await user.click(screen.getByRole('button', { name: /skicka flyttanmälan/i }));

    expect(screen.getByText('Adress är obligatoriskt')).toBeInTheDocument();
    expect(screen.getByText('Postnummer är obligatoriskt')).toBeInTheDocument();
    expect(screen.getByText('Stad är obligatoriskt')).toBeInTheDocument();
    expect(screen.getByText('Flyttdatum är obligatoriskt')).toBeInTheDocument();
    expect(screen.getByText('Avtalstyp är obligatoriskt')).toBeInTheDocument();

    expect(emitted().submit).toBeUndefined();
  });

  it('emits submit event with form payload when inputs are valid', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { emitted } = render(MoveForm);

    await user.type(screen.getByLabelText('Ny adress'), 'Solvägen 12');
    await user.type(screen.getByLabelText('Postnummer'), '80267');
    await user.type(screen.getByLabelText('Ort'), 'Gävle');
    await user.type(screen.getByLabelText('Inflyttningsdatum'), '2026-09-20');
    await user.selectOptions(screen.getByRole('combobox'), 'Rörligt pris');

    await user.click(screen.getByRole('button', { name: /skicka flyttanmälan/i }));

    expect(emitted().submit).toBeDefined();
    expect(emitted().submit[0][0]).toEqual({
      address: 'Solvägen 12',
      zip: '80267',
      city: 'Gävle',
      date: '2026-09-20',
      contract: 'Rörligt pris',
    });
  });
});
