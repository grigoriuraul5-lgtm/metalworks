import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index.js';

export default defineConfig({
  name: 'kraft-metalworks',
  title: 'KRAFT Metalworks — CMS',

  projectId: 'ji68swnc',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),          // GROQ query explorer (optional but useful)
  ],

  schema: {
    types: schemaTypes,
  },
});
