import { Field, InputType } from "type-graphql";
import { Cat } from "./cat.entities";

@InputType()
export class LogginInfosInput implements Partial<Cat> {
  @Field()
  email: string;

  @Field()
  password: string;
}
