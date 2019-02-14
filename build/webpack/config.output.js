import path from 'path';
import { mainDirectories, userSettings } from '../config';
import { isDevMode } from './helpers';

const { config: userConfig } = userSettings;

export const output = {
  path: isDevMode()
    ? path.join(__dirname, '../', mainDirectories.dev)
    : path.join(__dirname, '../', mainDirectories.prod),
  filename: userConfig.cacheBusting
    ? 'app/[name].[chunkhash].bundle.js'
    : 'app/[name].bundle.js',
  chunkFilename: userConfig.cacheBusting
    ? 'app/[name].[chunkhash].bundle.js'
    : 'app/[name].bundle.js',
  publicPath: '/'
};
