export const typography = {
    fonts: {
      heading: 'var(--font-heading)', // Use CSS variables
      body: 'var(--font-body)',
      mono: 'var(--font-mono)'
    },
    fontSizes: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      md: '1rem',      // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      // ... up to 6xl
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      normal: 'normal',
      none: 1,
      shorter: 1.25,
      short: 1.375,
      base: 1.5,
      tall: 1.625,
      // ... etc
    }
  } as const;