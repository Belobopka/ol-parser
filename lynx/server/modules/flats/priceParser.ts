import { parse } from "node-html-parser";

type TParseHtmlPageParams = {
  html: string;
  rootUrl: string;
};

type TReplaceHrefWithRootUrlParams = {
  url: string;
  rootUrl: string;
};

class PriceParser {
  parseHtmlPage({ html, rootUrl }: TParseHtmlPageParams) {
    const root = parse(html);
    const body = root.querySelector("body");
    if (!body) return null;
    const grid = body.querySelector('[data-testid="listing-grid"]');
    if (!grid) return null;

    const elements = grid.querySelectorAll('[data-cy="l-card"]');

    const result = elements.map((element) => {
      const title = element
        .querySelector('[data-cy="ad-card-title"]')
        ?.text.trim();
      const price = element
        .querySelector('[data-testid="ad-price"]')
        ?.text.trim();
      const locationDate = element
        .querySelector('[data-testid="location-date"]')
        ?.text.trim();
      const blueprintCardParamIcon = element
        .querySelector('[color="text-global-secondary"]')
        ?.text.trim();
      const href = element.querySelector("a")?.getAttribute("href");
      const image = element.querySelector("img")?.getAttribute("src");

      return {
        title,
        price,
        locationDate,
        blueprintCardParamIcon,
        href: href
          ? this.replaceHrefWithRootUrl({ url: href, rootUrl })
          : undefined,
        image: image
          ? this.replaceImageWithRootUrl({ url: image, rootUrl })
          : undefined,
      };
    });

    return result;
  }

  replaceHrefWithRootUrl({ url, rootUrl }: TReplaceHrefWithRootUrlParams) {
    return url.replace("/d/", `${rootUrl}/`);
  }
  replaceImageWithRootUrl({ url, rootUrl }: TReplaceHrefWithRootUrlParams) {
    return url;
  }
}

export default PriceParser;
