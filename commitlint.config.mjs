const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        'hero',
        'services',
        'products',
        'process',
        'about',
        'contact',
        'metrics',
        'cases',
        'problems',
        'clients',
        'layout',
        'header',
        'footer',
        'i18n',
        'config',
        'ui',
        'seo',
        'a11y',
        'e2e',
        'ci',
        'deps',
        'redesign',
        'quiz',
        'api',
        'hubspot',
      ],
    ],
    'body-max-line-length': [1, 'always', 120],
  },
};

export default config;
