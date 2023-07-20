/* eslint-env node */

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
		'plugin:jest/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: true,
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh', 'no-relative-import-paths'],
	rules: {
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{ checksVoidReturn: false },
		],
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'no-relative-import-paths/no-relative-import-paths': [
			'warn',
			{ allowSameFolder: false, rootDir: 'src', prefix: '@' },
		],
		'@typescript-eslint/no-non-null-assertion': 'off',
	},
	ignorePatterns: [
		'.eslintrc.cjs',
		'tailwind.config.js',
		'vite.config.ts',
		'jest.config.ts',
		'postcss.config.js',
		'cypress',
	],
}
