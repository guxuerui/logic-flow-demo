// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  rules: {
    '@typescript-eslint/no-empty-object-type': 'off',
    'no-alert': 'off',
  },
  ignores: [
    '.DS_Store',
    'node_modules',
    '/build',
    '/package',
    '.env',
    '.env.*',
    '!.env.example',
    '*.md',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock',
    '/test/*',
  ],
})
