import axios from "axios";
import appConfig from "../config";
axios.defaults.baseURL = appConfig.base_url;
export function callGetApi(url: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

export function callPostApi(url: string, params: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, params);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}
