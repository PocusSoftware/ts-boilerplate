const isWatch = process.argv.includes('--watch');
const isProd = process.env['NODE_ENV'] === 'production';

const targets = [
  { entry: 'src/client/main.ts', out: 'client' },
  { entry: 'src/server/main.ts', out: 'server' },
] as const;

const results = await Promise.all(
  targets.map((target) =>
    Bun.build({
      entrypoints: [target.entry],
      outdir: 'dist',
      naming: `${target.out}.js`,
      target: 'node',
      format: 'cjs',
      minify: isProd,
      sourcemap: isProd ? 'none' : 'inline',
    }).then((result) => ({ target, result })),
  ),
);

let hadError = false;

for (const { target, result } of results) {
  if (!result.success) {
    hadError = true;
    for (const message of result.logs) console.error(message);
    continue;
  }

  console.log(`built dist/${target.out}.js`);
}

if (hadError && !isWatch) process.exit(1);
