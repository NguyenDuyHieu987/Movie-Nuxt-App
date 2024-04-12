module.exports = {
  // root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    indent: ['off', 2],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error']
      }
    ],
    'consistent-return': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'warn',
    semi: 'off',
    'prefer-const': 'warn',
    camelcase: 'off',
    eqeqeq: 0,
    'no-redeclare': 'off',
    'no-unused-vars': [
      'off',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'prefer-regex-literals': 'off',
    'line-comment-position': [
      'warn',
      {
        position: 'above'
      }
    ],
    'multiline-comment-style': ['off', 'starred-block'],
    'func-call-spacing': 'off',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation': [
      'off',
      'always',
      {
        ignore: ['on']
      }
    ],
    'vue/v-on-event-hyphenation': 'off',
    'vue/no-unused-vars': 'off',
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true
      }
    ],
    'vue/html-indent': [
      'off',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    '@typescript-eslint/func-call-spacing': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports'
      }
    ],
    '@typescript-eslint/no-use-before-define': ['off', {}],
    // "simple-import-sort/imports": [
    //   "warn",
    //   {
    //     "groups": [
    //       [
    //         // Side effect imports.
    //         "^\\u0000",
    //         // Packages. `vue` related packages come first.
    //         "^vue",
    //         "^@?~?#?\\w",
    //         // Internal packages.
    //         "^(src|components|config|pages|services|server|types|utils|stores)(/.*|$)",
    //         // Parent imports. Put `..` last.
    //         "^\\.\\.(?!/?$)",
    //         "^\\.\\./?$",
    //         // Other relative imports. Put same-folder imports and `.` last.
    //         "^\\./(?=.*/)(?!/?$)",
    //         "^\\.(?!/?$)",
    //         "^\\./?$",
    //         // Style imports.
    //         "^.+\\.s?css$"
    //       ]
    //     ]
    //   }
    // ],
    'simple-import-sort/exports': 'warn'
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      // extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/semi': 'off',
        'prefer-const': 'warn'
      }
    }
  ],
  ignorePatterns: [
    'eslint.config.js',
    'lint-staged.config.js',
    '.nuxt/*',
    'node_modules/*',
    'public/js/*',
    'coverage/*',
    '.output/*',
    'build/*',
    'dist/*',
    'dist-test/*',
    '**/*.css',
    '**/*.scss',
    '**/*.less'
  ]
};
