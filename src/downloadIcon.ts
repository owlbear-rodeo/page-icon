import { URL } from "url";

import axios from "axios";
import * as fileType from "file-type";

import { Icon } from "./index";

function getSiteDomain(siteUrl: string) {
  return new URL(siteUrl).hostname;
}

async function downloadIcon(iconUrl: string): Promise<Icon | null> {
  let iconResponse;
  try {
    iconResponse = await axios.get(iconUrl, {
      responseType: "arraybuffer",
      //'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
    });
  } catch {
    return null;
  }

  const iconData = await iconResponse.data;
  if (!iconData) {
    return null;
  }

  const fileDetails = await fileType.fromBuffer(iconData);
  if (!fileDetails) {
    return null;
  }

  return {
    source: iconUrl,
    name: getSiteDomain(iconUrl),
    data: iconData,
    size: iconData.length,
    ext: `.${fileDetails.ext}`, // add `.` to ext
    mime: fileDetails.mime,
  };
}

export default downloadIcon;
