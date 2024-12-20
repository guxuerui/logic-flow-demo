/// <reference types="vitest" />

import type { UserConfig } from 'vite'
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import prism from 'markdown-it-prism'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'

// import type { UserConfig as VitestUserConfigInterface } from 'vitest/config'
// import type { InlineConfig } from 'vitest'
// import type { UserConfig } from 'vite'
//
// interface VitestConfigExport extends UserConfig {
//   test: InlineConfig
// }

export default defineConfig({
  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
    globals: true,
    threads: false,
    watch: false,
    include: ['**/*.test.{js,tsx,ts}'],
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Markdown({
      headEnabled: true,
      markdownItUses: [
        prism,
      ],
    }),
    Pages({
      pagesDir: 'src/pages',
      extensions: ['vue', 'md'],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
        {
          axios: [
            ['default', 'axios'],
          ],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
} as UserConfig)
