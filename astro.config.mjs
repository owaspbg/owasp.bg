import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://owasp.bg',
  // Astro 7's default ('jsx') drops line breaks around elements, gluing text to links
  // ("под<a>отворен лиценз</a>"). `true` compresses losslessly and keeps those spaces.
  compressHTML: true,
});
