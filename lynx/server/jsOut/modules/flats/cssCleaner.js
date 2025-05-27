"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cssRegex = /\.css-[a-zA-Z0-9]+(:hover)?{[^}]*}/g;
class CSSCleaner {
    cleanCSS(text) {
        if (!text)
            return;
        return text.replace(cssRegex, "");
    }
    cleanParseResult(result) {
        if (!result)
            return;
        return result.map((element) => {
            const title = this.cleanCSS(element.title);
            const price = this.cleanCSS(element.price);
            const locationDate = this.cleanCSS(element.locationDate);
            const blueprintCardParamIcon = this.cleanCSS(element.blueprintCardParamIcon);
            return {
                title,
                price,
                locationDate,
                blueprintCardParamIcon,
                href: element.href,
                image: element.image,
            };
        });
    }
}
exports.default = CSSCleaner;
