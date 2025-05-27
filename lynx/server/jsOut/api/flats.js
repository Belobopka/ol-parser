"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cssCleaner_js_1 = __importDefault(require("../modules/flats/cssCleaner.js"));
const fetch_js_1 = __importDefault(require("../modules/flats/fetch.js"));
const priceParser_js_1 = __importDefault(require("../modules/flats/priceParser.js"));
const parser = new priceParser_js_1.default();
const fetchSystem = new fetch_js_1.default();
const cssCleaner = new cssCleaner_js_1.default();
const rootOLXURL = "https://www.olx.ua";
const generateUrl = ({ price }) => {
    const urlOLX = `${rootOLXURL}/uk/nedvizhimost/kvartiry/prodazha-kvartir/kiev/q-%D0%BE%D0%B1%D0%BE%D0%BB%D0%BE%D0%BD%D1%8C/?currency=USD&search%5Border%5D=created_at:desc&search%5Bfilter_float_price:to%5D=${price}`;
    return urlOLX;
};
const run = (html) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchResult = yield fetchSystem.fetchHtml(html);
    const parseResult = parser.parseHtmlPage({
        html: fetchResult,
        rootUrl: rootOLXURL,
    });
    return cssCleaner.cleanParseResult(parseResult);
});
exports.default = (app) => {
    app.get("/flats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const price = req.query.price;
        res.set('Access-Control-Allow-Origin', req.get('origin'));
        if (!price) {
            res.status(400).send("price parameter is required");
            return;
        }
        try {
            const result = yield run(generateUrl({ price }));
            res.json(result);
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error fetching or parsing the HTML page");
        }
    }));
    return app;
};
