import { DataSource } from "typeorm";
import { User } from "./entity/User";
import * as dotenv from "dotenv";

dotenv.config();
const { BACKEND_FILE } = process.env;

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  synchronize: true,
  logging: true,
  entities: [User],
});
