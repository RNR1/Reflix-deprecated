import { DenonConfig } from 'https://deno.land/x/denon/mod.ts'
import { config as env } from 'https://deno.land/x/dotenv/mod.ts'

const config: DenonConfig = {
	scripts: {
		start: {
			cmd: 'app.ts',
			desc: 'Run app',
			env: env()
		}
	},
	allow: ['env', 'plugin', 'read', 'write', 'net'],
	importmap: './importmap.json',
	unstable: true,
	tsconfig: './tsconfig.json',
	watch: false
}

export default config
