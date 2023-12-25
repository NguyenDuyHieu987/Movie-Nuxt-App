module.exports = {
  '*.{ts,tsx,js,mjs,cjs,vue}': [
    'prettier --write',
    'eslint --fix --cache',
    'git add'
  ]
};
