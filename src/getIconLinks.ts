import { URL, resolve } from "url";

import cheerio, { CheerioAPI } from "cheerio";

function hrefIsIcon(href: string) {
  return /((icon.*\.(png|jpg))|(\w+\.ico))/.test(href);
}

function linkTagLinks($: CheerioAPI) {
  const links: Array<string> = [];
  $("link").each(function (_, element) {
    const href = $(element).attr("href");
    if (!href || !hrefIsIcon(href)) {
      return;
    }
    links.push(href);
  });
  return links;
}

function metaTagLinks($: CheerioAPI) {
  const links: Array<string> = [];
  $("meta").each((_, element) => {
    const property = $(element).attr("property");
    if (property !== "og:image") {
      return;
    }

    const graphImageUrl = $(element).attr("content");
    if (graphImageUrl) {
      links.push(graphImageUrl);
    }
  });

  return links;
}

function getIconLinks(rootUrl: string, dom: string) {
  var $ = cheerio.load(dom);
  let iconLinks: Array<string> = [];

  iconLinks = iconLinks.concat(linkTagLinks($));
  iconLinks = iconLinks.concat(metaTagLinks($));

  iconLinks = iconLinks.map((iconLink) => {
    return resolve(rootUrl, iconLink);
  });

  return iconLinks;
}

export default getIconLinks;
