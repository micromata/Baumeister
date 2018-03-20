import path from 'path';
import {mainDirectories} from '../config';
import {isDevMode} from './helpers';

const configFile = require('../../baumeister.json');

export const output = {
	path: isDevMode() ? path.join(__dirname, '../', mainDirectories.dev) : path.join(__dirname, '../', mainDirectories.prod),
	filename: configFile.cacheBusting ? 'app/[name].[chunkhash].bundle.js' : 'app/[name].bundle.js',
	chunkFilename: configFile.cacheBusting ? 'app/[name].[chunkhash].bundle.js' : 'app/[name].bundle.js'
};
