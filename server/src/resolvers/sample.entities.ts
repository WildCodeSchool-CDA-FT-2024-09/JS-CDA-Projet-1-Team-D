import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity } from "typeorm";
import "reflect-metadata";

@ObjectType()
@Entity()
export class SampleUser extends BaseEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field()
  isFavorite: boolean;
}

export default SampleUser;
