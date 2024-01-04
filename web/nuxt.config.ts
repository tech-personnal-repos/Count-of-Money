// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    app: {
        head: {
            title: 'Count of Money',
            htmlAttrs: { lang: 'en' },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content:
                        'width=device-width,initial-scale=1,maximum-scale=1'
                }
            ]
        }
    },

    runtimeConfig: {
        public: {
            api: process.env.BACKEND_URL,
            sockets: process.env.SOCKET_URL,
            static: process.env.STATIC_URL,
            wip: process.env.NODE_ENV !== 'production',

            oauth: {
                redirectUri: process.env.OAUTH_REDIRECT_URI,
                google: {
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    projectId: process.env.GOOGLE_PROJECT_ID,
                    authUri: process.env.GOOGLE_AUTH_URI,
                    tokenUri: process.env.GOOGLE_TOKEN_URI,
                    authProviderX509CertUrl:
                        process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL
                },

                github: {
                    clientId: process.env.GITHUB_CLIENT_ID,
                    authUri: process.env.GITHUB_AUTH_URI
                }
            }
        }
    },

    css: [
        '@/assets/css/main.css',
        '@/assets/css/fonts.css',
        '@/assets/css/animations.css',
        '@/assets/css/toast.css',
        '@/assets/css/tooltip.css'
    ],

    imports: {
        dirs: ['composables', 'composables/charts', 'composables/dashboard']
    },

    modules: [
        '@nuxt/devtools',
        '@pinia/nuxt',
        '@vite-pwa/nuxt',
        'floating-vue/nuxt'
    ],

    pinia: {
        //@ts-ignore
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']]
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },

    build: {
        transpile: ['vue-toastification', 'chart.js']
    },

    pwa: {
        manifestFilename: 'manifest.json',

        workbox: {
            navigateFallback: undefined
        },

        manifest: {
            name: 'Count of Money',
            short_name: 'CM',
            display: 'standalone',
            background_color: '#1F2145',
            lang: 'en',
            description: '',
            theme_color: '#1f2145'
        }
    },

    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id
                                .toString()
                                .split('node_modules/')[1]
                                .split('/')[0]
                                .toString();
                        }
                    }
                }
            }
        }
    }
});
