// eslint.config.js
import next from 'eslint-config-next';

const config = [
  ...next,
  {
    rules: {
      // Your custom rules here, for example:
      // 'react/no-unescaped-entities': 'off',
    },
  },
];

export default config;
