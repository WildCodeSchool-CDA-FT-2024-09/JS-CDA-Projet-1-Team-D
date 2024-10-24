import { DataSource } from "typeorm";
import { Cat } from "./cats/cat.entities";
import { Like } from "./likes/like.entities";
import { Interest } from "./interests/interest.entities";
import * as dotenv from "dotenv";
import { MeetingPlace } from "./meetingPlaces/meetingPlace.entities";

dotenv.config();
const { BACKEND_FILE } = process.env;

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  synchronize: true,
  logging: true,
  entities: [Cat, Like, Interest, MeetingPlace],
});
