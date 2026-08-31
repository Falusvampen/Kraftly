import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import MoveFormView from '../../src/views/MoveFormView.vue';
import * as api from '../../src/services/api';

vi.mock('../../src/services/api', () => ({
  submitMove: vi.fn(),
}));

describe('MoveFormView.vue', () => {
  beforeEach(() => {
    // vi.useFakeTimers() används för att kunna manipulera systemtiden i testerna :)
    // vi.setSystemTime() används för att sätta systemtiden till ett specifikt datum, i det här fallet 2026-09-01.
    // vi.clearAllMocks() används för att rensa alla mockade funktioner innan varje test, så att vi inte får några så kallade"spillover" effekter från tidigare tester.
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-01'));
    vi.clearAllMocks();
  });

  afterEach(() => {
    // vi.useRealTimers() återställer systemtiden till den verkliga tiden efter varje test!
    cleanup();
    vi.useRealTimers();
  });

  it('submits form data and shows confirmation message with reference number', async () => {
    // userEvent.setup({ advanceTimers: vi.advanceTimersByTime }) används för att skapa en användarsimulator som kan interagera med komponenten på ett realistiskt sätt.
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    // vi.mocked(api.submitMove).mockResolvedValueOnce({ ref: 'MOVE-98765' }) används för att mocka API-anropet som skickar formulärdata till servern. Mockningen gör att vi kan testa komponenten utan att faktiskt göra ett nätverksanrop, och vi kan specificera vilket värde som ska returneras av mocken.
    vi.mocked(api.submitMove).mockResolvedValueOnce({ ref: 'MOVE-98765' });

    render(MoveFormView);

    // Fyll i formuläret med hjälp av userEvent och screen från @testing-library/vue. Vi använder placeholder-texten för att hitta rätt input-fält och fylla i dem med testdata.
    await user.type(screen.getByPlaceholderText('Ny adress'), 'Solvägen 12');
    await user.type(screen.getByPlaceholderText('Postnummer'), '80267');
    await user.type(screen.getByPlaceholderText('Ort'), 'Gävle');
    await user.type(screen.getByPlaceholderText('Inflyttningsdatum (ÅÅÅÅ-MM-DD)'), '2026-09-20');
    await user.selectOptions(screen.getByRole('combobox'), 'Rörligt pris');

    // Klicka på knappen "Skicka flyttanmälan" för att skicka formuläret. Vi använder screen.getByRole för att hitta knappen baserat på dess roll och namn.
    await user.click(screen.getByRole('button', { name: /skicka flyttanmälan/i }));

    // Verifiera API-anropet och att bekräftelsetext och referensnummer visas på sidan. Vi använder vi.mocked(api.submitMove).toHaveBeenCalledWith för att verifiera att API-anropet skickades med rätt data, och screen.findByText för att verifiera att referensnumret visas på sidan.
    expect(api.submitMove).toHaveBeenCalledWith({
      address: 'Solvägen 12',
      zip: '80267',
      city: 'Gävle',
      date: '2026-09-20',
      contract: 'Rörligt pris',
    });

    // Verifiera att bekräftelsetext och referensnummer visas på sidan med hjälp av screen.findByText och screen.getByText. Vi använder regex för att matcha referensnumret, eftersom det kan variera mellan olika testkörningar.
    expect(await screen.findByText(/MOVE-98765/)).toBeInTheDocument();
    expect(screen.getByText(/Tack för din anmälan!/i)).toBeInTheDocument();
  });
});
