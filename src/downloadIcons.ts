import { Icon } from ".";

import downloadIcon from "./downloadIcon";

function isDefined(icon: Icon | null): icon is Icon {
  return icon !== null;
}

async function downloadIcons(iconUrls: Array<string>): Promise<Array<Icon>> {
  const promises = iconUrls.map(downloadIcon);

  const iconPaths = await Promise.all(promises);
  return iconPaths.filter(isDefined);
}

export default downloadIcons;
