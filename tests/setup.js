import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

// Registrerar axe-matchern globalt för alla Vitest-tester.
// Obs: Kontrastregler mäts inte i jsdom då jsdom saknar fullständig layoutmotor och CSS-beräkning.
expect.extend(toHaveNoViolations);
