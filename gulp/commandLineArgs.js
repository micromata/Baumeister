import minimist from 'minimist';

export const args = minimist(process.argv.slice(2), {
	boolean: ['production', 'watch'],
	string: ['bump', 'prerelease-identifier'],
	alias: {P: 'production', B: 'bump', W: 'watch'}
});

export function hasBumpType() {
	return ['major', 'minor', 'patch', 'prerelease', 'premajor', 'preminor', 'prepatch'].includes(args.bump);
}

export function isProdBuild() {
	return args.production || hasBumpType();
}
