# ts-boilerplate

TypeScript resource for FiveM Enhanced (Node.js runtime).

```
bun install
bun run watch   # rebuild on change
bun run check   # lint + fmt + typecheck
```

Build outputs `dist/client.js` and `dist/server.js` (CJS). Restart the resource after each build, watch does not hot-reload.

## Runtime limits (Enhanced)

- No native TS execution. Enhanced runs JS only, build (Bun) compiles TS to CJS first.
- No ESM output. Must bundle as CommonJS (`format: 'cjs'` in build.ts).
- No `node_version` field in fxmanifest, Enhanced ignores it (legacy/Node runtime only).
- No arbitrary npm native addons (`.node` binaries) unless FiveM ships that binding.
