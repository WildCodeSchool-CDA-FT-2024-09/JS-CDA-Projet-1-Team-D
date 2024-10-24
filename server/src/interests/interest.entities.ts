import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { Cat } from "../cats/cat.entities";

@ObjectType()
@Entity()
export class Interest extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Cat])
  @ManyToMany(() => Cat, (cat) => cat.interests)
  @JoinTable()
  cats?: Cat[];
}
