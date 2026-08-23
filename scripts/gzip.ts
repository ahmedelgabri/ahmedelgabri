import { gzipSync } from 'node:zlib'
import { build } from 'esbuild'

const result = await build({
	bundle: true,
	entryPoints: ['./mod.ts'],
	format: 'esm',
	minify: true,
	platform: 'neutral',
	treeShaking: true,
	write: false,
})

const output = result.outputFiles[0].contents
const compressed = gzipSync(output)

console.log('bytes (minify):', output.length.toLocaleString())
console.log('bytes (gzip):', compressed.length.toLocaleString())
