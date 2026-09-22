import { watch } from 'node:fs';

const isWatch = process.argv.includes('--watch');
const isProd = process.env['NODE_ENV'] === 'production';

const targets = [
  { entry: 'src/client/main.ts', out: 'client' },
  { entry: 'src/server/main.ts', out: 'server' },
] as const;

const build = async (): Promise<boolean> => {
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

  let ok = true;

  for (const { target, result } of results) {
    if (!result.success) {
      ok = false;
      for (const message of result.logs) console.error(message);
      continue;
    }

    console.log(`built dist/${target.out}.js`);
  }

  return ok;
};

const ok = await build();

if (!isWatch) {
  if (!ok) process.exit(1);
} else {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;
  watch('src', { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => void build(), 100);
  });
  console.log('watching src/');
}
