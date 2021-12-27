import express, { Application } from "express";
import "./config";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import appConfig from "./config";
import { callPostApi } from "./api";
import ProductRoutes from "./routes/products.routes";

const port = appConfig.port;
const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

app.get("/", async (_, res) => {
  res.send("UP");
});

app.use("/products", new ProductRoutes().getRouter());

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
