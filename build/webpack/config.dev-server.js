import path from 'path';

import {mainDirectories} from '../config';
import {isDevMode} from './helpers';
import {stats} from './config.stats';

export const devServer = {
	contentBase: isDevMode() ? path.join(__dirname, '../', mainDirectories.dev) : path.join(__dirname, '../', mainDirectories.prod),
	port: isDevMode() ? 3000 : 3001,
	overlay: true,
	stats: {
		version: false,
		assets: false,
		modules: false,
		...stats
	}
};
