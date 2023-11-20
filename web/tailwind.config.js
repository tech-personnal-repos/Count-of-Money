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
                green: 'var(--success)',
                yellow: 'var(--warning)',
                red: 'var(--danger)',
                success: 'var(--success)',
                warning: 'var(--warning)',
                danger: 'var(--danger)',
                'card-color': 'var(--card-bg)',
                hover: 'var(--hover-bg)'
            },
        }
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.flex-col': {
                    display: 'flex',
                    flexDirection: 'column'
                },
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
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 900,
                    fontSize: '1.875rem',

                    lineHeight: '2.313rem',
                    letterSpacing: '0.05em'
                },

                '.font-h2': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 700,
                    fontSize: '1.125rem',

                    lineHeight: '1.375rem',
                    letterSpacing: '0.05em'
                },

                '.font-h3': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 700,
                    fontSize: '0.938rem',

                    lineHeight: '1.125rem',
                    letterSpacing: '0.04em'
                },

                '.font-h4': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 700,
                    fontSize: '0.75rem',

                    lineHeight: '0.938rem',
                    letterSpacing: '0.05em'
                },

                '.font-h5': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 400,
                    fontSize: '0.65rem',

                    lineHeight: '0.938rem',
                    letterSpacing: '0.03em'
                },

                '.font-legend': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 400,
                    fontSize: '0.625rem',

                    lineHeight: '0.625rem'
                },

                '.font-legendb': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 700,
                    fontSize: '0.625rem',

                    lineHeight: '0.75rem',
                    letterSpacing: '2%'
                },

                '.font-m1': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 400,
                    fontSize: '0.75rem',

                    lineHeight: '0.938rem',
                    letterSpacing: '0.03em'
                },

                '.font-mb1': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 600,
                    fontSize: '0.75rem',

                    lineHeight: '0.938rem',
                    letterSpacing: '0.03em'
                },

                '.font-m2': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',

                    fontWeight: 500,
                    fontSize: '0.625rem',

                    lineHeight: '0.75rem',
                    letterSpacing: '0.03em'
                }
            });
        }
    ]
};
