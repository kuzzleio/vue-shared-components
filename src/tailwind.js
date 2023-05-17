import path from 'path';

import { merge } from 'lodash';

import TailwindVSCConfig from '../tailwind.config';

/**
 * Get the base tailwind configuration to use in your project.
 * @param {import('tailwindcss').Config} extendedConfig Optional tailwind configuration to extend from.
 */
export function getTailwindConfig(extendedConfig = {}) {
  // ? the `?? __dirname` is ONLY used for tailwindcss vscode's intellisense extension
  const repositoryPath = process.env.npm_config_local_prefix ?? __dirname;
  const demoIoTPath = process.cwd();
  const isMonorepo = demoIoTPath !== repositoryPath;

  const webAppPath = path.resolve(repositoryPath, 'apps/web/src/**/*.{js,vue,html}');
  const packagePath = path.resolve(repositoryPath, 'packages/**/src/**/*.{js,vue,html}');
  // ? We ask tailwind to find classes used by VSC, otherwise it won't know about them
  const vscPath = path.resolve(
    repositoryPath,
    'node_modules/@kuzzleio/vue-shared-components/dist/*.es.js',
  );
  const tailwindConfig = TailwindVSCConfig;

  tailwindConfig.content = isMonorepo
    ? [webAppPath, packagePath, vscPath]
    : ['./src/**/*.{js,vue,html}'];

  return merge(JSON.parse(JSON.stringify(tailwindConfig)), extendedConfig);
}
