const mijin = require('mijin/dist/tailwind-preset.js');

module.exports = {
  theme: {
    // compatible with @nuxtjs/color-mode
    darkSelector: '.dark-mode'
  },
  presets: [
    mijin,
  ],
  variants: {
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd'
    ],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active']
  },
  plugins: [require('tailwindcss-dark-mode')()],
  purge: {
    content(contentDefaults) {
      contentDefaults.push('node_modules/mijin/src/components/**/*.vue')
      return contentDefaults.map((file) => file.replace('.js', '.ts'))
    },
    options: {
      whitelist: ['dark-mode']
    }
  }
}
