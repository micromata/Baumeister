import minimist from 'minimist';

export const args = minimist(process.argv.slice(2), {
	boolean: ['production', 'watch'],
	string: ['bump', 'prerelease-identifier'],
	alias: {P: 'production', B: 'bump', W: 'watch'}
});

export function hasBumpType() {
	return args.bump === 'major' ||
					args.bump === 'minor' ||
					args.bump === 'patch' ||
					args.bump === 'prerelease' ||
					args.bump === 'premajor' ||
					args.bump === 'preminor' ||
					args.bump === 'prepatch';
}

export function isProdBuild() {
	return args.production || hasBumpType();
}
