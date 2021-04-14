import builtins from 'rollup-plugin-node-builtins';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import image from '@rollup/plugin-image';
import html from '@rollup/plugin-html';

import path from 'path';

import livereload from 'rollup-plugin-livereload';

const fullSitePath = 'public';
const devDist = 'public';

const isProd = process.env.NODE_ENV === 'production';
const debugReact = process.env.DEBUG_REACT == 'true';

const extensions = ['.js', '.ts', '.tsx'];

const onwarn = (warning, rollupWarn) => {
  const ignoredWarnings = [
    {
      ignoredCode: 'CIRCULAR_DEPENDENCY',
      ignoredPath: 'node_modules/',
    },
  ];
  if (
    !ignoredWarnings.some(
      ({ ignoredCode, ignoredPath }) => warning.code === ignoredCode && warning.importer.includes(path.normalize(ignoredPath)),
    )
  ) {
    rollupWarn(warning);
  }
};

const res = [
  // Site
  {
    input: 'src/js/index.tsx',

    output: {
      file: path.join(fullSitePath, 'index.js'),
      format: 'iife',
      // intro: 'const global = window;',
    },
    context: 'null',
    moduleContext: 'null',
    watch: {
      chokidar: {
        usePolling: true,
      },
    },
    onwarn,
    plugins: [
      html({
        template: ({ attributes, bundle, files, publicPath, title }) => {
          return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Rollup Bundle</title>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="index.js"></script>
  </body>
</html>
          `;
        },
      }),
      image(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      }),

      nodeResolve({
        extensions,
        preferBuiltins: true,
      }),
      builtins(),
      commonjs({
        include: /node_modules/,
      }),
      babel({
        extensions,
        exclude: /node_modules/,
        babelrc: false,
        babelHelpers: 'runtime',
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        plugins: [
          'react-require',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-class-properties',
          [
            '@babel/plugin-proposal-object-rest-spread',
            {
              useBuiltIns: true,
            },
          ],
          [
            '@babel/plugin-transform-runtime',
            {
              helpers: true,
              regenerator: true,
              useESModules: false,
            },
          ],
        ],
      }),
      scss({
        output: path.join(fullSitePath, 'index.css'),
      }),
      isProd && terser(),
      !isProd &&
        serve({
          host: 'localhost',
          // port: port,
          open: false,
          contentBase: [path.join(fullSitePath)],
        }),
      !isProd &&
        livereload({
          watch: devDist,
        }),
    ],
  },
];
export default res;
