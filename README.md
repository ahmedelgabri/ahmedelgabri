<div align="center">
	<img src="https://www.nyan.cat/cats/original.gif" width="150" alt="Nyan Cat">
	<h1>Ahmed El Gabri's card</h1>
	<p>A portable terminal business card for Node.js, Deno, Bun, and workerd.</p>
</div>

## Run the card

```sh
# Node.js 22+
npx ahmedelgabri@latest

# Deno
deno run --allow-env jsr:@ahmed/card

# Bun
bunx ahmedelgabri@latest

# Web
curl -L gabri.me/card
```

The CLI respects [`NO_COLOR`](https://no-color.org/). Deno can run without `--allow-env`; if environment access is unavailable, the CLI safely defaults to colored output.

## Use the API

The renderer is deterministic, ESM-only, and has no runtime dependencies. Colors default to enabled and can be controlled explicitly.

```ts
import { getCard } from 'jsr:@ahmed/card' // Deno
// import { getCard } from 'ahmedelgabri' // Node.js or Bun

console.log(getCard({ color: false }))
```

### workerd and Cloudflare Workers

Install the npm package and import it through your Worker bundler. The package works without the `nodejs_compat` compatibility flag.

```ts
import { getCard } from 'ahmedelgabri'

export default {
	fetch(): Response {
		return new Response(getCard({ color: false }), {
			headers: { 'content-type': 'text/plain; charset=utf-8' },
		})
	},
}
```

## Development

```sh
deno task test
deno task test:runtimes
deno task check:package
deno task gzip
```

`deno task build` emits the npm package into the ignored `npm/` directory. The generated package is ESM-only, requires Node.js 22 or newer, and exposes both `ahmedelgabri` and `ahmedelgabri/cli`.
