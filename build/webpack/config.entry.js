import path from 'path';
import globby from 'globby';
import { settings, userSettings } from '../config';

const { config: userConfig } = userSettings;

export const entry = {
  app: [
    ...getVendorCSS(),
    `${path.join(__dirname, '../../', settings.sources.app)}index.js`
  ]
};

function getVendorCSS() {
  // Return flattened array of resolved globs from Baumeister user config.
  const vendorCSS = [].concat(
    ...userConfig.vendor.bundleCSS.map(glob =>
      globby.sync(`./node_modules/${glob}`)
    )
  );
  if (!vendorCSS.length) {
    return [];
  }

  return vendorCSS;
}
