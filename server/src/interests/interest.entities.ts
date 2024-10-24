import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IsString } from "class-validator";

import { Cat } from "../cats/cat.entities";

@ObjectType()
@Entity()
export class Interest extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  @IsString()
  name: string;

  @Field(() => [Cat])
  @ManyToMany(() => Cat, (cat) => cat.interests)
  @JoinTable()
  cats?: Cat[];
}
