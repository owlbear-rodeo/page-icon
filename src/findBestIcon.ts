import { Icon } from "./index";

function sortIconsBySize(icons: Array<Icon>) {
  return icons.sort((a, b) => {
    if (a.size < b.size) {
      return 1;
    } else {
      return -1;
    }
  });
}

function findBestIcon(icons: Array<Icon>, ext?: string) {
  const sorted = sortIconsBySize(icons);
  if (ext) {
    for (let icon of sorted) {
      if (icon.ext === ext) {
        return icon;
      }
    }
  }

  return sorted[0];
}

export default findBestIcon;
