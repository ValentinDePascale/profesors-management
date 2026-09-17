import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    // Enable Jest-like global test APIs (e.g., describe, it, expect) without explicit imports
    globals: true,

    // Choose the environment: 'node' (default), 'jsdom', or 'happy-dom'
    environment: 'node',

    // Include pattern for finding test files
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],

    // Exclude patterns (merging Vitest defaults with custom routes like e2e)
    exclude: [...configDefaults.exclude, '**/e2e/**'],

    // Code coverage configuration
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
    },
  },
});
