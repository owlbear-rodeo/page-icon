import fs from "fs";
import path from "path";
import { Icon } from "../src";

const ICON_SIZE_THRESHOLD_KB = 0.5;
const ICON_DIR = path.join(__dirname);

export function isIconValid(icon: Icon) {
  const fileSizeKB = icon.data.length / 1000;
  return fileSizeKB > ICON_SIZE_THRESHOLD_KB;
}

export function saveToFile(icon: Icon) {
  const filePath = path.join(ICON_DIR, `testicon_${icon.name}${icon.ext}`);
  return new Promise(function (resolve, reject) {
    fs.writeFile(filePath, icon.data, function (error) {
      if (error) {
        reject(error);
        return;
      }
      resolve(filePath);
    });
  });
}
