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
            fontSize: {
                sm: '0.600rem',
                base: '0.8rem',
                xl: '1.066rem',
                '2xl': '1.421rem',
                '3xl': '1.894rem',
                '4xl': '2.525rem',
                '5xl': '3.366rem'
            },
            fontFamily: {
                heading: 'Exo 2',
                body: 'Exo 2'
            },
            fontWeight: {
                normal: '400',
                bold: '700'
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
                }
            });
        }
    ]
};
