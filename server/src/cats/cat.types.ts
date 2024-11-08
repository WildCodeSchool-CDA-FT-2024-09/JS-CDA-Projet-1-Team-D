import { Field, InputType } from "type-graphql";
import { Cat } from "./cat.entities";
import { Interest } from "../interests/interest.entities";

@InputType()
export class LogginInfosInput implements Partial<Cat> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateProfileInput implements Partial<Cat> {
  @Field({ nullable: true })
  surname: string;

  @Field({ nullable: true })
  profile_picture: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  birthday: Date;

  @Field({ nullable: true })
  sexe: string;

  @Field({ nullable: true })
  hair_color: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  available: string;

  @Field({ nullable: true })
  breed: string;

  @Field(() => [String], { nullable: true })
  interests: Interest[];
}
