import { Request, Response } from "express";

import CSSCleaner from "../modules/flats/cssCleaner.js";
import Fetch from "../modules/flats/fetch.js";
import PriceParser from "../modules/flats/priceParser.js";
import { ExpressApp } from "../modules/types.js";

const parser = new PriceParser();
const fetchSystem = new Fetch();
const cssCleaner = new CSSCleaner();

const rootOLXURL = "https://www.olx.ua";

const generateUrl = ({ price }: { price: string }) => {
  const urlOLX = `${rootOLXURL}/uk/nedvizhimost/kvartiry/prodazha-kvartir/kiev/q-%D0%BE%D0%B1%D0%BE%D0%BB%D0%BE%D0%BD%D1%8C/?currency=USD&search%5Border%5D=created_at:desc&search%5Bfilter_float_price:to%5D=${price}`;
  return urlOLX;
};

const run = async (html: string) => {
  const fetchResult = await fetchSystem.fetchHtml(html);
  const parseResult = parser.parseHtmlPage({
    html: fetchResult,
    rootUrl: rootOLXURL,
  });

  return cssCleaner.cleanParseResult(parseResult);
};

export default (app: ExpressApp) => {
  app.get("/flats", async (req: Request, res: Response) => {
    const price = req.query.price as string;
    res.set('Access-Control-Allow-Origin', req.get('origin'));
    if (!price) {
      res.status(400).send("price parameter is required");
      return;
    }
    try {
      const result = await run(generateUrl({ price }));
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error fetching or parsing the HTML page");
    }
  });

  return app;
};
