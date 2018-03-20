import path from 'path';
import globby from 'globby';
import {settings} from '../config';

const configFile = require('../../baumeister.json');

export const entry = {
	app: `${path.join(__dirname, '../../', settings.sources.app)}index.js`,
	...getVendorCSS()
};

function getVendorCSS() {
	// Return flattened array of resolved globs from baumeister.json
	const vendorCSS = [].concat(...configFile.vendor.bundleCSS.map(glob => globby.sync(`./node_modules/${glob}`)));
	if (!vendorCSS.length) {
		return false;
	}
	return {vendor: vendorCSS};
}

