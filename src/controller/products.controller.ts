import { Request, Response } from "express";
import { IResponse, BadRequest, OkResponse } from "../commom/responses";
import { callPostApi, callGetApi } from "../api";

export default class ProductService {
  // Get products by name
  async getProductByName(params: {
    search_value: string;
    location: string;
  }): Promise<IResponse> {
    // check if search value is present or not
    if (!params.search_value) return BadRequest("Please enter value to search");
    // check if location value is present or not
    if (!params.location) return BadRequest("Specify Location to search");
    try {
      const { data }: any = await callPostApi("/client/v1/search", {
        context: {},
        message: {
          criteria: {
            search_string: params.search_value,
            delivery_location: params.location,
          },
        },
      });
      return OkResponse(data);
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  // on search product
  async searchProduct(params: { message_id: string }): Promise<IResponse> {
    if (!params.message_id) return BadRequest("Message id is required");
    try {
      const { data }: any = await callGetApi(
        `/client/v1/on_search?messageId=${params.message_id}`
      );
      return OkResponse(data);
    } catch (err) {
      return BadRequest(err.message);
    }
  }
}
