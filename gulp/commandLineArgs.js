import minimist from 'minimist';

export const args = minimist(process.argv.slice(2), {
	boolean: ['production', 'watch'],
	string: 'bump',
	alias: {P: 'production', B: 'bump', W: 'watch'}
});

export function hasBumpType() {
	return args.bump === 'major' ||
					args.bump === 'minor' ||
					args.bump === 'patch';
}

export function isProdBuild() {
	return args.production || hasBumpType();
}
