const version = '1.20260816.1'
const command = new Deno.Command('npx', {
	args: [
		'--yes',
		`workerd@${version}`,
		'test',
		'./tests/workerd.capnp',
	],
	stdin: 'inherit',
	stdout: 'inherit',
	stderr: 'inherit',
})

const result = await command.output()
if (!result.success) Deno.exit(result.code)
