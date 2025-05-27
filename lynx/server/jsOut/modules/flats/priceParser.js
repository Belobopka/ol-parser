"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_html_parser_1 = require("node-html-parser");
class PriceParser {
    parseHtmlPage({ html, rootUrl }) {
        const root = (0, node_html_parser_1.parse)(html);
        const body = root.querySelector("body");
        if (!body)
            return null;
        const grid = body.querySelector('[data-testid="listing-grid"]');
        if (!grid)
            return null;
        const elements = grid.querySelectorAll('[data-cy="l-card"]');
        const result = elements.map((element) => {
            var _a, _b, _c, _d, _e, _f;
            const title = (_a = element
                .querySelector('[data-cy="ad-card-title"]')) === null || _a === void 0 ? void 0 : _a.text.trim();
            const price = (_b = element
                .querySelector('[data-testid="ad-price"]')) === null || _b === void 0 ? void 0 : _b.text.trim();
            const locationDate = (_c = element
                .querySelector('[data-testid="location-date"]')) === null || _c === void 0 ? void 0 : _c.text.trim();
            const blueprintCardParamIcon = (_d = element
                .querySelector('[color="text-global-secondary"]')) === null || _d === void 0 ? void 0 : _d.text.trim();
            const href = (_e = element.querySelector("a")) === null || _e === void 0 ? void 0 : _e.getAttribute("href");
            const image = (_f = element.querySelector("img")) === null || _f === void 0 ? void 0 : _f.getAttribute("src");
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
    replaceHrefWithRootUrl({ url, rootUrl }) {
        return url.replace("/d/", `${rootUrl}/`);
    }
    replaceImageWithRootUrl({ url, rootUrl }) {
        return url;
    }
}
exports.default = PriceParser;
