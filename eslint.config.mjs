// // @ts-check
// import eslint from '@eslint/js';
// import tseslint from 'typescript-eslint';
// import globals from 'globals';
// import prettier from 'eslint-plugin-prettier';

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs', 'dist', 'node_modules'],
//   },

//   eslint.configs.recommended,

//   ...tseslint.configs.recommendedTypeChecked,

//   {
//     plugins: {
//       prettier,
//     },

//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },

//     rules: {
//       // 🔥 ESSENCIAL — faz o ESLint obedecer o Prettier
//       'prettier/prettier': [
//         'error',
//         {
//           endOfLine: 'auto',
//           singleQuote: true,
//           semi: true,
//           trailingComma: 'all',
//           printWidth: 100,
//           tabWidth: 2,
//         },
//       ],

//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//     },
//   },
// );

import tseslint from 'typescript-eslint';

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: './tsconfig.eslint.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
});