export default {
  '**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix --max-warnings=0',
    () => 'tsc --noEmit',
  ],
  '**/*.{json,css,scss,md,mdx,html,yml,yaml,prisma}': ['prettier --write'],
  '**/*.php': ['./vendor/bin/pint --test'],
};
