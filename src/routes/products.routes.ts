import { request, Router as ExpressRouter } from "express";
import ProductService from "../controller/products.controller";

interface Router {
  getRouter(): ExpressRouter;
}

export default class ProductRoutes implements Router {
  private static router: ExpressRouter = ExpressRouter();
  private productService: ProductService = new ProductService();

  constructor() {
    const { router } = ProductRoutes;

    // routes for getting a product
    router.post("/get-products", async (req, res) => {
      const { search_value, location } = req.body;
      if (typeof search_value !== "string")
        return res
          .status(400)
          .send({ data: null, err: "Search value should be string" });
      if (typeof location !== "string")
        return res
          .status(400)
          .send({ data: null, err: "Location should be string" });

      const { err, status, data } = await this.productService.getProductByName({
        search_value,
        location,
      });
      res.status(status).send({ err, data });
    });

    router.get("/on-search", async (req, res) => {
      const {message_id} = req.query;
      if (typeof message_id !== "string")
        return res
          .status(400)
          .send({ data: null, err: "Message id should be a string" });

      const { err, status, data } = await this.productService.searchProduct({
        message_id,
      });
      res.status(status).send({ err, data });
    });
  }

  getRouter(): ExpressRouter {
    return ProductRoutes.router;
  }
}
