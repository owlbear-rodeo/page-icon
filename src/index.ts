import { URL } from "url";

import downloadIcons from "./downloadIcons";
import findBestIcon from "./findBestIcon";
import getIconLinks from "./getIconLinks";
import getPage from "./getPage";

export interface Options {
  ext?: string;
  /** Set to false to disable open graph images */
  metaTags: boolean;
}

export interface Icon {
  source: string;
  name: string;
  data: Buffer;
  size: number;
  ext: string;
  mime: string;
}

function isHttps(pageUrl: string) {
  return new URL(pageUrl).protocol === "https:";
}

function makeHttps(pageUrl: string) {
  const parsed = new URL(pageUrl);
  parsed.protocol = "https:";
  return parsed.href;
}

async function main(
  pageUrl: string,
  options: Options = { metaTags: true }
): Promise<Icon> {
  const bestWithPref = function (icons: Array<Icon>) {
    return findBestIcon(icons, options.ext);
  };

  const dom = await getPage(pageUrl);
  const iconUrls = getIconLinks(pageUrl, dom, options.metaTags);
  const icons = await downloadIcons(iconUrls);
  const result = bestWithPref(icons);
  if (result || isHttps(pageUrl)) {
    return result;
  }
  const httpsUrl = makeHttps(pageUrl);
  return main(httpsUrl, options);
}

export default main;
