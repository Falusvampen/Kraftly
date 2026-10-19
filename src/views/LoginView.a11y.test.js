import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom/vitest';
import LoginView from './LoginView.vue';

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useRoute: () => ({ query: {} }),
}));

const renderLogin = () =>
  render(LoginView, { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } });

describe('LoginView – tillgänglighet', () => {
  it('har inga axe-överträdelser', async () => {
    const { container } = renderLogin();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('fälten har labels som en skärmläsare hittar', () => {
    renderLogin();
    expect(screen.getByLabelText('E-postadress')).toBeInTheDocument();
    expect(screen.getByLabelText('Lösenord')).toBeInTheDocument();
  });
});
