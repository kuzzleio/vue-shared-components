import path from 'path';

import { merge } from 'lodash';

import TailwindVSCConfig from '../tailwind.config';

/**
 * @param {import('tailwindcss').Config} extendedConfig
 */
export function getTailwindConfig(extendedConfig = {}) {
  const isMonorepo = process.cwd() !== process.env.npm_config_local_prefix;

  const webAppPath = path.resolve(__dirname, 'apps/web/src/**/*.{js,vue,html}');
  const packagePath = path.resolve(__dirname, 'packages/**/src/**/*.{js,vue,html}');
  // ? We ask tailwind to find classes used by VSC, otherwise it won't know about them
  const vscPath = path.resolve(
    __dirname,
    'node_modules/@kuzzleio/vue-shared-components/dist/es.js',
  );
  const tailwindConfig = TailwindVSCConfig;

  tailwindConfig.content = isMonorepo
    ? [webAppPath, packagePath, vscPath]
    : ['./src/**/*.{js,vue,html}'];

  return merge(JSON.parse(JSON.stringify(tailwindConfig)), extendedConfig);
}
