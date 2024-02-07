module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['**/node_modules/**'],
  rules: {
    'no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  noImplicitAny: false,
};
