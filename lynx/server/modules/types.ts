import { Application } from "express";

export type TParseResult = {
  title?: string;
  price?: string;
  url?: string;
  image?: string;
  blueprintCardParamIcon?: string;
  locationDate?: string;
  href?: string;
};

export type TPriceParser = {
  parseHtmlPage: (html: string) => null | TParseResult[];
};

export type ExpressApp = Application;
