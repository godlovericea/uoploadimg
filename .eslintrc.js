module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'indent': ['error', 4],
        // 'arrow-spacing': ['error', {'before': true, 'after': true}],
        'brace-style': ['error', '1tbs'],
        'constructor-super': 'error',
        'curly': ['error', 'all'],
        'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-cond-assign': 'error',
        'no-const-assign': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        // 'no-else-return': 'error',
        'no-empty': 'error',
        'no-empty-function': 'error',
        'no-eval': 'error',
        'no-floating-decimal': 'error',
        'no-global-assign': 'error',
        'no-implied-eval': 'error',
        'no-loop-func': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'arrow-parens': 'error',
        'no-dupe-args': 'error',
        'no-extra-semi': 'error',
        'no-unused-expressions': 'error',
        'no-new': 0
    }
}
