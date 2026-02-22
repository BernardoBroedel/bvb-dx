import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    minify: true,
    shims: true, // Polyfills para __dirname no formato ESM
});
