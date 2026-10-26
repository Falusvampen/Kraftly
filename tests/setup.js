import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/vue';
import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/vitest';

afterEach(cleanup);

// Registrerar axe-matchern globalt för alla Vitest-tester.
// Obs: Kontrastregler mäts inte i jsdom då jsdom saknar fullständig layoutmotor och CSS-beräkning.
expect.extend(toHaveNoViolations);
