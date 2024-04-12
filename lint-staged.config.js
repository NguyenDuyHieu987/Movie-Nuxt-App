module.exports = {
  '*.{ts,tsx,js,mjs,cjs,vue}': [
    'prettier --write',
    'eslint --fix --cache --cache-location ./node_modules/.cache/.eslintcache',
    'git add'
  ]
};
