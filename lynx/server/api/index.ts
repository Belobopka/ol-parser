import { ExpressApp } from "../modules/types.js";
import flats from "./flats";

const initApis = (app: ExpressApp) => {
  flats(app);

  return app;
};

export default initApis;
