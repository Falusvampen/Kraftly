import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom/vitest';

const renderApp = async (env) => {
  vi.resetModules();
  window.__KRAFTLY__ = { env };
  const { default: App } = await import('@/App.vue');

  return render(App, {
    global: {
      mocks: { $route: { path: '/login' } },
      stubs: {
        RouterLink: { template: '<a><slot /></a>' },
        RouterView: true,
      },
    },
  });
};

describe('App environment banner', () => {
  beforeEach(() => {
    window.__KRAFTLY__ = undefined;
  });

  afterEach(() => {
    cleanup();
  });

  it('shows the environment for non-production deployments', async () => {
    await renderApp('staging');

    expect(screen.getByText('STAGING')).toBeInTheDocument();
  });

  it('hides the environment banner in production', async () => {
    await renderApp('production');

    expect(screen.queryByText('PRODUCTION')).not.toBeInTheDocument();
    expect(document.querySelector('.env-banner')).not.toBeInTheDocument();
  });
});
