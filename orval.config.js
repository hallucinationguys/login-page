import { defineConfig } from 'orval'

export default defineConfig({
  app: {
    input: {
      target:
        'https://github.com/hallucinationguys/login-service/blob/main/docs/swagger.json',
      validation: false,
    },
    output: {
      mode: 'tags-split',
      workspace: './src/api',
      target: './page.ts',
      schemas: './model',
      client: 'swr',
      prettier: true,
      override: {
        mutator: {
          path: './mutator/requester.ts',
          name: 'requester',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'eslint ./src/api --ext .ts,.tsx,.js --fix', // run lint fix after all files are written
    },
  },
})
