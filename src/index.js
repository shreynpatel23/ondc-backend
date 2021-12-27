const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (_, res) => {
  try {
    const {data} = await axios
      .post("https://qa.api.box.beckn.org/bap/client/v1/search", {
        context: {},
        message: {
          criteria: {
            search_string: "coffee",
            delivery_location: "12.903561,77.5939631",
          },
        },
      });
      console.log(data);
      res.status(200).json(data);
  } catch (err) {
      console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
