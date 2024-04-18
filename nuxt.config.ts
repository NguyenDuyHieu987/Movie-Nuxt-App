// https://nuxt.com/docs/api/configuration/nuxt-config
import { version } from 'ant-design-vue';
import type { NuxtPage } from 'nuxt/schema';
import path, { resolve } from 'path';
import { isProduction } from 'std-env';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath } from 'url';

const antdVersion: number = +version.split('.')[0];

console.log('Antd version:', antdVersion);

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Phimhay247',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          charset: 'utf-8'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=Edge,chrome=1'
        },
        {
          'http-equiv': 'content-type',
          content: 'text/html;charset=utf-8'
        }
        // { name: 'color-scheme', content: 'only dark' }
      ],
      link: [
        // antdVersion == 4
        //   ? {
        //       rel: 'stylesheet',
        //       href: isProduction ? '/css/antdv4.css' : '/css/antdv4.dev.css'
        //     }
        //   : {}
      ],
      script: [
        {
          src: 'https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js?max_age=7776000',
          // src: 'https://tam.cdn-go.cn/aegis-sdk/latest/aegis.min.js?max_age=7776000',
          type: 'text/javascript',
          async: true
        },
        {
          src: 'https://accounts.google.com/gsi/client',
          type: 'text/javascript',
          async: true
        }
      ]
    },
    rootId: '__nuxt',
    buildAssetsDir: '/_nuxt/',
    keepalive: true,
    pageTransition: { name: 'page', mode: 'out-in', appear: true },
    templateParams: {
      separator: '|',
      separatorDash: '-'
    },
    // titleTemplate: '%s %separator %siteName',
    titleTemplate: (title: any) => {
      return title ? `${title} %separator %siteName` : '%siteName';
    },
    description: 'Xem phim Online 24/7'
  },
  runtimeConfig: {
    app: {
      production_mode: isProduction,
      apiGateway: process.env.API_GATEWAY,
      serverImageUrl: process.env.SERVER_IMAGE_URL,
      serverVideoUrl: process.env.SERVER_VIDEO_URL,
      adminWebsiteUrl: process.env.ADMIN_WEBSITE_URL,
      googleAnalyticsID: process.env.GOOGLE_ANALYTICS_ID,
      googleTagManagerID: process.env.GOOGLE_TAG_MANAGER_ID,
      facebookAppID: process.env.FACEBOOK_APP_ID,
      googleOauth2ClientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      googleOauth2ClientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
      TMDBurl: process.env.TMDB_IMAGE_BASE_URL
    },
    public: {
      // SEO
      siteUrl: 'https://phimhay247z.org',
      siteName: 'Phimhay247',
      titleSeparator: '|',
      language: 'vi',
      trailingSlash: false
    }
  },
  alias: {
    '@': path.resolve(__dirname, './'),
    components: fileURLToPath(new URL('./components', import.meta.url)),
    common: fileURLToPath(new URL('./common', import.meta.url)),
    services: fileURLToPath(new URL('./services', import.meta.url)),
    utils: fileURLToPath(new URL('./utils', import.meta.url)),
    stores: fileURLToPath(new URL('./stores', import.meta.url))
  },
  imports: {
    dirs: [
      'common'
      // 'services',
      //  'stores'
    ]
  },
  experimental: {
    asyncEntry: true,
    asyncContext: true,
    crossOriginPrefetch: true,
    componentIslands: {
      selectiveClient: true
    },
    headNext: true,
    payloadExtraction: true,
    renderJsonPayloads: true,
    restoreState: true,
    viewTransition: true,
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },
  features: {
    inlineStyles: true
  },
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  css: [
    antdVersion == 4
      ? 'ant-design-vue/dist/reset.css'
      : 'ant-design-vue/dist/antd.dark.min.css',
    '~/assets/style/fonts/GoogleFonts.css',
    '~/assets/style/globalStyle/overwrite/antdv/antdv.scss',
    '~/assets/style/globalStyle/overwrite/element/element.scss',
    '~/assets/style/globalStyle.scss'
  ],
  modules: [
    '@ant-design-vue/nuxt',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxt/image',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    'nuxt-gtag',
    'nuxt-lodash',
    // 'nuxt-purgecss',
    // SEO
    '@nuxtjs/seo',
    '@nuxtjs/sitemap'
  ],
  // extends: ['nuxt-seo-kit'],
  antd: {
    extractStyle: true,
    icons: false
  },
  elementPlus: {
    icon: false,
    themes: ['dark'],
    injectionID: {
      // prefix: 1024,
      prefix: Math.floor(Math.random() * 10000),
      current: 0
    },
    appendTo: ['#append-to']
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  swiper: {
    modules: ['navigation', 'virtual', 'free-mode', 'scrollbar', 'autoplay'],
    styleLang: 'css'
  },
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  lodash: {
    prefix: '_lodash_',
    prefixSkip: false,
    upperAfterPrefix: true,
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => stringToCamelCase
      ['kebabCase', 'stringToKebab'], // => stringToKebab
      ['isDate', 'isLodashDate'] // => _isLodashDate
    ]
  },
  image: {
    // provider: 'cloudinary',
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 50,
          height: 50
        }
      }
    },
    provider: 'imagekit',
    imagekit: {
      // baseURL: 'https://ik.imagekit.io/8toa5f2rp/images',
      baseURL: ''
    },
    format: ['avif', 'webp'],
    domains: ['https://ik.imagekit.io'],
    alias: {}
  },
  fontMetrics: {},
  googleFonts: {
    preload: false,
    display: 'swap',
    families: {
      // Roboto: true,
      Roboto: { wght: '100..700', ital: '100..700' },
      'Roboto Flex': {
        // wght: true,
        // regular: 400,
        // normal: 400
      },
      Lobster: {
        // wght: true,
        // regular: 400,
        // normal: 400
      }
      // subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese']
    }
  },
  // SEO
  site: {
    name: 'Phimhay247',
    url: 'https://phimhay247z.org',
    trailingSlash: false
  },
  plugins: [],
  hooks: {
    'pages:extend': function (pages: any) {
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = [];
        for (const page of pages) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page);
          } else {
            removePagesMatching(pattern, page.children);
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1);
        }
      }
      removePagesMatching(/\/components\//, pages);
    }
  },
  build: {
    // analyze: true,
  },
  components: {
    global: false,
    loader: true,
    generateMetadata: true,
    dirs: [
      {
        path: '~/components/global',
        global: true,
        extensions: ['.vue'],
        pathPrefix: false
      }
      // {
      //   path: '~/components',
      //   global: false,
      //   extensions: ['.vue'],
      //   pathPrefix: false
      // }
    ]
  },
  vue: { propsDestructure: true },
  ssr: true,
  sourcemap: {
    server: true,
    client: false
  },
  router: {
    options: {
      strict: false,
      scrollBehaviorType: 'auto'
    }
  },
  optimization: {},
  vite: {
    resolve: {
      alias: {
        'ant-design-vue/dist': 'ant-design-vue/dist',
        'ant-design-vue/es': 'ant-design-vue/es',
        'ant-design-vue/lib': 'ant-design-vue/es',
        'ant-design-vue': 'ant-design-vue/es'
      }
    },
    plugins: [svgLoader({})],
    ssr: {
      // external: ['ant-design-vue'],
      noExternal: []
    },
    optimizeDeps: {
      include: ['./components/**/*.vue', 'ant-design-vue', 'element-plus']
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "~/assets/style/globalStyle/_variables.scss";`
          additionalData:
            '@use "~/assets/style/globalStyle/_variables.scss" as *;'
        }
      },
      transformer: 'postcss',
      lightningcss: {},
      postcss: {}
    },
    build: {
      // ssr: true,
      modulePreload: {
        // polyfill: false
      },
      manifest: true,
      ssrManifest: true,
      sourcemap: 'hidden',
      assetsDir: '_nuxt/',
      // cssMinify: 'lightningcss',
      cssCodeSplit: true,
      reportCompressedSize: true,
      minify: 'terser',
      terserOptions: {
        ecma: 2020,
        sourceMap: true,
        parse: {
          html5_comments: false
        },
        compress: true,
        toplevel: true,
        mangle: {},
        format: {
          ecma: 2020,
          comments: false
        }
      }
    },
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    },
    server: {
      hmr: {
        overlay: true
      }
    },
    test: {}
  },
  nitro: {
    // preset: 'static',
    prerender: {
      crawlLinks: false,
      routes: [
        '/',
        '/feature',
        '/television',
        '/login',
        '/oauth/google',
        '/signup',
        '/ForgotPassword',
        '/upgrade/plans',
        '/help',
        '/contact'
      ],
      ignore: [
        '/discover',
        '/search',
        '/ranks',
        '/follow',
        '/history',
        '/YourAccount',
        '/info-movie',
        '/info-tv',
        '/play-movie',
        '/play-tv'
      ]
    },
    minify: true,
    compressPublicAssets: { gzip: true, brotli: true },
    storage: {
      redis: {
        driver: 'redis'
      }
    },
    output: {},
    rollupConfig: {
      // input: {},
      output: {
        // manualChunks: {
        //   lodash: ['lodash']
        // }
      }
    }
  },
  webpack: {
    optimization: {},
    optimizeCSS: true,
    postcss: {}
  },
  generate: {
    routes: [],
    exclude: []
  },
  routeRules: {
    '/': { isr: true, prerender: true },
    '/feature/**': { isr: true },
    '/television/**': { isr: true },
    '/discover/**': { isr: true },
    '/search/**': { isr: true },
    '/ranks/**': { isr: true },
    '/login': {
      prerender: true
    },
    '/oauth/**': { prerender: true },
    '/signup': {
      prerender: true
    },
    '/ForgotPassword': { prerender: true },
    '/ResetPassword': { isr: false },
    '/ChangeEmail': { isr: false },
    '/follow/**': { isr: false },
    '/history/**': { isr: false },
    '/info-movie/**': { isr: true },
    '/info-tv/**': { isr: true },
    '/play-movie/**': { isr: true },
    '/play-tv/**': { isr: true },
    '/upgrade/plans': { prerender: true },
    '/upgrade/PaymentPicker': { isr: false },
    '/upgrade/**': { isr: true },
    '/upgrade': { redirect: '/upgrade/plans' },
    '/plans': { redirect: '/upgrade/plans' },
    '/YourAccount/**': { isr: false },
    '/help/**': { prerender: true },
    '/contact/**': { prerender: true },
    '/contactus': { redirect: '/contact' }
  }
});
