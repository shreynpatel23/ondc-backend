import express, { Application } from "express";
import "./config";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import appConfig from "./config";
import { callPostApi } from "./api";

const port = appConfig.port;
const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

app.get("/", async (_, res) => {
  try {
    const { data }: any = await callPostApi("/client/v1/search", {
      context: {},
      message: {
        criteria: {
          search_string: "coffee",
          delivery_location: "12.903561,77.5939631",
        },
      },
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
