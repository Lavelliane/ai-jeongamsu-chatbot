import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';
import { colors } from './config/colors-config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: colors,
      backgroundImage: {
        'gradient-stroke':
          'linear-gradient(90deg, #FFD815 0%, #C6E7FF 50%, #FF00AE 100%)',
        'gradient-fill': 'linear-gradient(90deg, #FEAC5E 0%, #FF00AE 100%)',
        'text-gradient': 'linear-gradient(90deg, #C6E7FF 0%, #FF00AE 100%)',
        'background-100':
          ' radial-gradient(ellipse 120% 72% at right, #423230, #423032, #412f34, #392d38, #322c35, #211F21, #00000000, #00000000, #00000000)',
        'background-200':
          'radial-gradient(ellipse 140% 100% at center, #413045, #3A253E, #00000000,#00000000,#00000000)',
        'background-300':
          'radial-gradient(ellipse 100% 100% at center, #9A2C5A, #9A2C5A, #723155, #3F273D, #00000000,#00000000, #00000000, #00000000, #00000000)',
        'background-400':
          'radial-gradient(ellipse 120% 72% at center,  rgba(144, 104, 224, 0.3) 0%, rgba(144, 104, 224, 0.3) 10%, rgba(144, 104, 224, 0.1) 50%, rgba(255, 192, 203, 0.0) 70%, rgba(255, 192, 203, 0.0) 100%)',
      },
      'gradient-glare': `
							radial-gradient(circle at 30% 30%, rgba(255, 192, 203, 0.8) 0%, rgba(255, 105, 180, 0.4) 50%, rgba(0, 0, 0, 0) 100%),
								radial-gradient(circle at 70% 70%, rgba(255, 223, 70, 0.8) 0%, rgba(255, 165, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%),
								radial-gradient(circle at 50% 50%, rgba(144, 104, 224, 0.6) 0%, rgba(75, 0, 130, 0.3) 60%, rgba(0, 0, 0, 0) 100%)`,
    },
    animation: {
      scroll: 'scroll 10s linear infinite',
    },
    keyframes: {
      scroll: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        dividerWeight: '1px', // h-divider the default height applied to the divider component
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
      },
      prefix: 'chelo',
      defaultTheme: 'light',
      addCommonColors: true,
      themes: {
        light: {
          extend: 'light',
          layout: {
            hoverOpacity: 0.9,
          },
          colors: {
            default: {
              DEFAULT: colors.shark[950],
            },
            primary: {
              ...colors.tanhide,
              DEFAULT: colors.tanhide[500],
            },
            secondary: {
              ...colors.shark,
              DEFAULT: colors.shark[500],
            },
          },
        },
      },
    }),
  ],
};

export default config;
