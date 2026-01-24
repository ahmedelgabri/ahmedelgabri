# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

A personal CLI "business card" for Ahmed El Gabri. When run, it displays a
styled terminal card with contact info and social links. The card can be
executed via:

- `deno run -r --allow-env jsr:@ahmed/card`
- `npx ahmedelgabri@latest`
- `curl -L gabri.me/card`

## Commands

```bash
# Development (watch mode)
deno task dev

# Build npm package (generates ./npm directory)
deno task build

# Lint and format
deno fmt --check
deno lint
deno doc --lint mod.ts

# Type check
deno check ./scripts/*.ts ./*.ts

# Check gzipped size
deno task gzip

# Full publish workflow (builds, publishes to npm + JSR, commits, tags, pushes)
# Requires version arg (e.g., 8.0.6) and optional npm publish flag
deno task publish public] <version >[--access
```

## Architecture

- **mod.ts** - Main module exporting `getCard()` function. Contains all card
  formatting logic using boxen and @std/fmt/colors
- **card.ts** - Entry point for `deno run` execution (calls `getCard()` and logs
  output)
- **scripts/build.ts** - Uses @deno/dnt to transpile Deno code to Node.js
  package in ./npm directory
- **scripts/publish.ts** - Full release automation: builds npm package,
  publishes to both npm and JSR, creates git tag, pushes

## Dual Publishing

The package is published to both:

- **JSR** as `@ahmed/card` (Deno native)
- **npm** as `ahmedelgabri` (transpiled via dnt)

The npm directory is generated during build and contains the transpiled CJS/ESM
code with proper shims for Deno APIs.
