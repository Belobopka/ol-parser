import express from "express";
import { Request, Response } from "express";

import initApis from "./api";

const app = express();
const port = 3030;

initApis(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
