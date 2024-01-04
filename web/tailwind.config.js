/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './composables/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}'
    ],
    theme: {
        extend: {
            colors: {
                text: 'var(--text)',
                background: 'var(--background)',
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                accent: 'var(--accent)',
                'accent-15': 'var(--accent-15)',
                green: 'var(--success)',
                orange: 'var(--warning)',
                red: 'var(--danger)',
                success: 'var(--success)',
                warning: 'var(--warning)',
                danger: 'var(--danger)',
                'card-color': 'var(--card-bg)',
                hover: 'var(--hover-bg)'
            },
            borderRadius: {
                '4xl': {
                    borderRadius: '1.875rem'
                }
            }
        }
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.text-ellipsis': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                },

                '.absolute-center': {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                },

                '.fixed-center': {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                },

                '.grid-center': {
                    display: 'grid',
                    placeItems: 'center'
                },

                '.flex-center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },

                '.font-h1': {
                    'font-family': 'Baloo Da 2',
                    'font-size': '67px',
                    'font-weight': 700,
                    'line-height': '40px',
                    'letter-spacing': 0
                },

                '.font-h2': {
                    'font-family': 'Baloo Da 2',
                    'font-size': '51px',
                    'font-weight': 700,
                    'line-height': '40px',
                    'letter-spacing': 0
                },

                '.font-h3': {
                    'font-family': 'Baloo Da 2',
                    'font-size': '38px',
                    'font-weight': 700,
                    'line-height': '28px',
                    'letter-spacing': 0
                },

                '.font-h4': {
                    'font-family': 'Baloo Da 2',
                    'font-size': '29px',
                    'font-weight': 700,
                    'line-height': '28px',
                    'letter-spacing': 0
                },

                '.font-h5': {
                    'font-family': 'Baloo Da 2',
                    'font-size': '21px',
                    'font-weight': 700,
                    'line-height': '28px',
                    'letter-spacing': 0
                },

                '.font-legend': {
                    'font-family': 'Baloo Da 2',
                    'font-size': '12px',
                    'font-weight': 400,
                    'line-height': 'normal',
                    'letter-spacing': 0
                },

                '.font-legendb': {
                    'font-family': 'Baloo Da 2',
                    'font-size': '12px',
                    'font-weight': 700,
                    'line-height': 'normal',
                    'letter-spacing': 0
                },

                '.font-m1': {
                    fontFamily: 'Baloo Da 2',
                    fontStyle: 'normal',

                    fontWeight: 400,
                    fontSize: '16px',

                    lineHeight: '18px',
                    letterSpacing: 0
                },

                '.font-mb1': {
                    fontFamily: 'Baloo Da 2',
                    fontStyle: 'normal',

                    fontWeight: 700,
                    fontSize: '16px',

                    lineHeight: 'normal',
                    letterSpacing: 0
                },
                '.card': {
                    'box-shadow': '1px 2px 8px 0px rgba(0, 0, 0, 0.25)',
                    'border-radius': '1.875rem'
                }
            });
        }
    ]
};
