import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import BaseInput from '../../src/components/BaseInput.vue';

describe('BaseInput.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('renders input with correct placeholder and receives user input', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    const { emitted } = render(BaseInput, {
      props: {
        placeholder: 'Ny adress',
        modelValue: '',
      },
    });

    const input = screen.getByPlaceholderText('Ny adress');
    expect(input).toBeInTheDocument();

    await user.type(input, 'Storgatan 1');

    expect(emitted()['update:modelValue']).toBeDefined();
    expect(emitted()['update:modelValue'].at(-1)).toEqual(['Storgatan 1']);
  });

  it('renders error message when error prop is provided', () => {
    render(BaseInput, {
      props: {
        placeholder: 'Ny adress',
        error: 'Adress är obligatoriskt',
      },
    });

    expect(screen.getByText('Adress är obligatoriskt')).toBeInTheDocument();
  });
});
