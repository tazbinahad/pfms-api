import { config } from "./interface/config";

const globalConfig: config = {
  port: process.env.PORT || 3000,
};

export default globalConfig;
