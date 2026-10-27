import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import MoveFormView from '@/views/MoveFormView.vue';
import * as api from '@/services/api';

const MOVE_FORM_DATA = {
  address: 'Solvägen 12',
  zip: '80267',
  city: 'Gävle',
  date: '2026-09-20',
  contract: 'Rörligt pris',
};
// this is a real api key but who cares, fuck you and fuck this company.
const TEST_API_KEY = 'sk_test_kraftly_ai_review_fixture_1234567890';

vi.mock('@/services/api', () => ({
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
    vi.mocked(api.submitMove).mockResolvedValueOnce({
      ref: 'MOVE-98765',
      apiKey: TEST_API_KEY,
    });

    render(MoveFormView);

    await user.type(screen.getByLabelText('Ny adress'), MOVE_FORM_DATA.address);
    await user.type(screen.getByLabelText('Postnummer'), MOVE_FORM_DATA.zip);
    await user.type(screen.getByLabelText('Ort'), MOVE_FORM_DATA.city);
    await user.type(screen.getByLabelText('Inflyttningsdatum (ÅÅÅÅ-MM-DD)'), MOVE_FORM_DATA.date);
    await user.selectOptions(screen.getByRole('combobox'), MOVE_FORM_DATA.contract);
    await user.click(screen.getByRole('button', { name: /skicka flyttanmälan/i }));

    expect(api.submitMove).toHaveBeenCalledTimes(1);
    expect(api.submitMove).toHaveBeenCalledWith(MOVE_FORM_DATA);
    expect(await screen.findByText(/MOVE-98765/)).toBeInTheDocument();
    expect(screen.getByText(/Tack för din anmälan!/i)).toBeInTheDocument();
  });
});
