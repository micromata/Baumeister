import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {isProdMode} from './helpers';

const configFile = require('../../baumeister.json');

export const generateCssFile = new ExtractTextPlugin({
	filename: configFile.cacheBusting && isProdMode() ? 'assets/css/[name].[chunkhash].bundle.css' : 'assets/css/[name].bundle.css'
});
