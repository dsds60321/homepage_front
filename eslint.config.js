import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    {
        files: ['**/*.{js,jsx}'],
        ignores: ['dist'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser, // globals.browser를 풀어넣기
            },
            parserOptions: {
                ecmaVersion: 2020,
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        settings: { react: { version: 'detect' } },
        plugins: {
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
        },
    },
    {
        files: ['**/*.js'], // 추가적인 파일 패턴
        linterOptions: {
            reportUnusedDisableDirectives: true, // 이 설정을 추가
        },
        rules: {
            // 여기에 필요한 추가 규칙을 정의할 수 있습니다.
        },
    },
];
