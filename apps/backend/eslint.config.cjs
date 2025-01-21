const baseConfig = require('../../eslint.config.cjs');

module.exports = [
  ...baseConfig,
  {
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
];
