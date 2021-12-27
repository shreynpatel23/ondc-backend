import dotenv from "dotenv";

dotenv.config();

const appConfig = {
  base_url: process.env.QA_API_BASE_URL,
  port: process.env.PORT,
};

export default appConfig;
